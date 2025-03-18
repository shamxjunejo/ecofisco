import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { format, addDays, startOfDay, addMinutes, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { createZoomMeeting, formatZoomDate } from '../services/zoom';
import { sendAppointmentConfirmation } from '../services/email';

interface TimeSlot {
    time: string;
    available: boolean;
}

interface ZoomMeetingDetails {
    id: string;
    join_url: string;
    password: string;
    start_url: string;
}

const AppointmentBooking: React.FC = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('zoom');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(format(new Date(), 'MMMM yyyy'));
    const [zoomError, setZoomError] = useState<string | null>(null);
    const [meetingDetails, setMeetingDetails] = useState<ZoomMeetingDetails | null>(null);

    // Generate calendar days for the current month view
    const generateCalendarDays = () => {
        const firstDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
        const lastDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
        const days = [];

        // Add days from previous month to fill the first week
        const firstDayOfWeek = firstDay.getDay();
        for (let i = firstDayOfWeek; i > 0; i--) {
            const prevDay = new Date(firstDay);
            prevDay.setDate(prevDay.getDate() - i);
            days.push({ date: prevDay, isCurrentMonth: false });
        }

        // Add days of current month
        for (let i = 1; i <= lastDay.getDate(); i++) {
            const day = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            days.push({ date: day, isCurrentMonth: true });
        }

        // Add days from next month to complete the last week
        const lastDayOfWeek = lastDay.getDay();
        for (let i = 1; i < 7 - lastDayOfWeek; i++) {
            const nextDay = new Date(lastDay);
            nextDay.setDate(nextDay.getDate() + i);
            days.push({ date: nextDay, isCurrentMonth: false });
        }

        return days;
    };

    // Navigate to previous or next month
    const navigateMonth = (direction: 'prev' | 'next') => {
        const newDate = new Date(selectedDate);
        if (direction === 'prev') {
            newDate.setMonth(newDate.getMonth() - 1);
        } else {
            newDate.setMonth(newDate.getMonth() + 1);
        }
        setSelectedDate(newDate);
        setCurrentMonth(format(newDate, 'MMMM yyyy'));
    };

    // Generate time slots for the selected date
    const generateTimeSlots = () => {
        const slots: TimeSlot[] = [];
        const dayOfWeek = selectedDate.getDay();

        // Only generate slots for Wednesday (3) and Saturday (6)
        if (dayOfWeek === 3 || dayOfWeek === 6) {
            const startTime = addMinutes(startOfDay(selectedDate), 10 * 60); // 10 AM

            // Generate 6 slots of 30 minutes each (10 AM to 1 PM)
            for (let i = 0; i < 6; i++) {
                const slotTime = addMinutes(startTime, i * 30);
                slots.push({
                    time: format(slotTime, 'h:mm a'),
                    available: true,
                });
            }
        }

        return slots;
    };

    // Check availability of time slots
    useEffect(() => {
        const checkAvailability = async () => {
            const slots = generateTimeSlots();
            const appointmentsRef = collection(db, 'appointments');
            const q = query(
                appointmentsRef,
                where('date', '==', format(selectedDate, 'yyyy-MM-dd'))
            );

            const querySnapshot = await getDocs(q);
            const bookedSlots = querySnapshot.docs.map(doc => doc.data().time);

            const updatedSlots = slots.map(slot => ({
                ...slot,
                available: !bookedSlots.includes(slot.time),
            }));

            setTimeSlots(updatedSlots);
        };

        checkAvailability();
    }, [selectedDate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTime || !name || !email) return;

        setLoading(true);
        setZoomError(null);
        
        try {
            // Format date for Zoom API
            const formattedDate = formatZoomDate(selectedDate, selectedTime);
            let zoomMeeting: ZoomMeetingDetails | null = null;
            
            // If using Zoom, create a meeting
            if (location === 'zoom') {
                try {
                    zoomMeeting = await createZoomMeeting(
                        `EcoFisco Consultation with ${name}`,
                        formattedDate,
                        30, // 30 minutes duration
                        'Asia/Karachi', // Pakistan timezone
                        notes ? `Meeting agenda: ${notes}` : 'Free consultation appointment'
                    );
                    setMeetingDetails(zoomMeeting);
                } catch (error) {
                    console.error('Failed to create Zoom meeting:', error);
                    setZoomError('Failed to create Zoom meeting. The appointment will be booked but you may need to set up the meeting manually.');
                }
            }

            // Add the appointment to Firebase
            await addDoc(collection(db, 'appointments'), {
                name,
                email,
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedTime,
                location,
                notes,
                createdAt: new Date().toISOString(),
                status: 'pending',
                // Add Zoom meeting details if available
                zoom: zoomMeeting ? {
                    id: zoomMeeting.id,
                    join_url: zoomMeeting.join_url,
                    password: zoomMeeting.password
                } : null
            });
            
            // Send confirmation email
            try {
                await sendAppointmentConfirmation(
                    name,
                    email,
                    selectedDate,
                    selectedTime,
                    location,
                    zoomMeeting ? {
                        id: zoomMeeting.id,
                        join_url: zoomMeeting.join_url,
                        password: zoomMeeting.password
                    } : undefined
                );
            } catch (error) {
                console.error('Failed to send confirmation email:', error);
                // Don't block the appointment creation if email fails
            }
            
            setSuccess(true);
            setStep(3);
        } catch (error) {
            console.error('Error booking appointment:', error);
        }
        setLoading(false);
    };

    const getDateLabel = (date: Date) => {
        if (isToday(date)) return 'Today';
        if (isTomorrow(date)) return 'Tomorrow';
        if (isThisWeek(date)) return format(date, 'EEEE');
        return format(date, 'MMMM d, yyyy');
    };

    return (
        <div className="min-h-screen font-poppins bg-white py-6">
            <div className="max-w-5xl mx-auto px-4">
                <div className="rounded-xl overflow-hidden flex flex-col md:flex-row border border-gray-300 shadow-md bg-white">

                    {/* Left Column - Information */}
                    <div className="md:w-1/4 bg-gray-50 p-6 border-r border-gray-200">
                        <div className="flex flex-col h-full">
                            <div>
                                <h1 className="text-xl font-bold text-blue-700 tracking-wide">Khadija Zouine</h1>
                                <h3 className="font-medium text-gray-500 text-sm mb-3">Immigration & Tax Consultant</h3>
                                <div className="border-t border-gray-200 my-4"></div>

                                <h2 className="text-lg font-semibold text-gray-800 mb-2">Free Appointment</h2>
                                <div className="flex items-center text-gray-600 text-sm">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>30 minutes</span>
                                </div>
                            </div>

                            {step === 2 && selectedTime && (
                                <div className="mt-6 bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                                    <div className="flex items-center text-gray-700 text-sm mb-2">
                                        <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-medium">Selected Time:</span>
                                    </div>
                                    <div className="pl-6 text-gray-800">
                                        <p className="text-sm mb-1">{selectedTime} - {format(addMinutes(new Date(selectedDate.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(' ')[0].split(':')[1]))), 30), 'h:mm a')}</p>
                                        <p className="text-sm">{format(selectedDate, 'EEEE, MMMM d, yyyy')}</p>
                                    </div>

                                </div>
                            )}

                            <div className="mt-auto">
                                <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                                    <p className="text-gray-800 text-sm mb-2">
                                        <span className="font-semibold">Do you have questions about our services?</span>
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        Book a free 30-minute <span className="text-blue-700 font-medium">information call</span> with us!
                                    </p>
                                </div>

                                <div className="border-t border-gray-200 my-4"></div>

                                <p className="text-sm text-gray-600 mb-2">
                                    We'll discuss your needs and determine how we can best assist you.
                                </p>

                                <p className="text-sm text-gray-600">
                                    After our call, we can schedule a follow-up consultation if needed.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="md:w-3/4 flex flex-col md:flex-row">
                        {step === 1 && (
                            <>
                                {/* Calendar Column */}
                                <div className="w-full md:w-1/2 p-6 border-b md:border-b-0 md:border-r border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Date</h3>
                                    <div className="text-xs text-gray-600 mb-3">
                                        <p>Available days: Wednesdays and Saturdays</p>
                                    </div>

                                    {/* Calendar */}
                                    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white h-[400px] flex flex-col">
                                        <div className="flex justify-between items-center mb-4">
                                            <button
                                                onClick={() => navigateMonth('prev')}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                                            >
                                                <ChevronLeftIcon className="w-5 h-5" />
                                            </button>
                                            <h3 className="font-semibold text-gray-800">{currentMonth}</h3>
                                            <button
                                                onClick={() => navigateMonth('next')}
                                                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                                            >
                                                <ChevronRightIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 flex-1 gap-1">
                                            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                                                <div key={day} className="text-center text-xs font-semibold text-gray-600 pb-2">
                                                    {day}
                                                </div>
                                            ))}

                                            {generateCalendarDays().map((day, index) => {
                                                const dayOfWeek = day.date.getDay();
                                                const isAvailableDay = dayOfWeek === 3 || dayOfWeek === 6; // Wednesday (3) or Saturday (6)
                                                const isSelected = format(day.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                                                const isPast = day.date < new Date();
                                                const isDisabled = !day.isCurrentMonth || isPast || !isAvailableDay;

                                                return (
                                                    <button
                                                        key={index}
                                                        onClick={() => !isDisabled ? setSelectedDate(day.date) : null}
                                                        disabled={isDisabled}
                                                        className={`
       aspect-square flex items-center justify-center rounded-full text-sm transition-all duration-200
       ${!day.isCurrentMonth ? 'text-gray-300' : ''}
       ${isPast ? 'cursor-not-allowed text-gray-300' : ''}
       ${!isAvailableDay && day.isCurrentMonth ? 'text-gray-400' : ''}
       ${isSelected ? 'bg-blue-600 text-white font-medium shadow-sm' : ''}
       ${!isDisabled && !isSelected ? 'hover:bg-blue-50 hover:text-blue-700' : ''}
     `}
                                                    >
                                                        <span className={`${isAvailableDay && !isDisabled && !isSelected ? 'relative' : ''}`}>
                                                            {format(day.date, 'd')}
                                                            {isAvailableDay && !isDisabled && !isSelected && (
                                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></span>
                                                            )}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                                {/* Time Slots Column */}
                                <div className="w-full md:w-1/2 p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Available Times</h3>
                                    <div className="text-xs text-gray-600 mb-3">
                                        <p>Available hours: 10:00 AM - 1:00 PM</p>
                                    </div>

                                    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white h-[400px] overflow-y-auto custom-scrollbar">
                                        <div className="grid grid-cols-1 gap-3">
                                            {timeSlots.length === 0 ? (
                                                <div className="text-center py-12 text-gray-500">
                                                    <p>Please select a Wednesday or Saturday to view available times</p>
                                                </div>
                                            ) : (
                                                timeSlots.map((slot, index) => {
                                                    const startTime = slot.time;
                                                    const [hours, minutes] = startTime.split(':');
                                                    const date = new Date();
                                                    date.setHours(parseInt(hours));
                                                    date.setMinutes(parseInt(minutes));
                                                    const endTime = new Date(date.getTime() + 30 * 60000);
                                                    const timeRange = `${format(date, 'h:mm a')} - ${format(endTime, 'h:mm a')}`;

                                                    return (
                                                        <button
                                                            key={index}
                                                            onClick={() => {
                                                                if (slot.available) {
                                                                    setSelectedTime(slot.time);
                                                                    setStep(2);
                                                                }
                                                            }}
                                                            disabled={!slot.available}
                                                            className={`
                                                            relative py-3 px-3 rounded-md text-center transition-all duration-200 w-full
                                                            ${slot.available
                                                                    ? 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-800 hover:text-blue-700 hover:shadow'
                                                                    : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
                                                                }
                                                        `}
                                                        >
                                                            <div className="flex flex-col items-center space-y-0">
                                                                <span className="font-medium text-base">{timeRange}</span>
                                                                {!slot.available && (
                                                                    <span className="text-xs font-small text-gray-500 bg-gray-200 px-2 py-0.0 rounded-full">
                                                                        Unavailable
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </button>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Step 2: Enter Details */}
                        {step === 2 && (
                            <div className="w-full p-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center text-blue-600 mb-6 hover:text-blue-800 transition-colors"
                                >
                                    <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                    <span>Back to Calendar</span>
                                </button>

                                <h2 className="text-xl font-semibold mb-6 text-gray-800">Enter Your Details</h2>

                                <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                            placeholder="Enter your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                            placeholder="email@example.com"
                                            required
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">How would you like to meet? *</label>
                                        <div className="space-y-3">
                                            <label className="flex items-center p-3 border border-gray-200 rounded-md bg-white hover:border-blue-300 transition-colors cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="zoom"
                                                    checked={location === 'zoom'}
                                                    onChange={() => setLocation('zoom')}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="ml-3 flex items-center text-gray-800">
                                                    <svg className="w-5 h-5 mr-2 text-blue-600"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        aria-label="Zoom"
                                                        role="img"
                                                        viewBox="0 0 512 512">
                                                        <rect
                                                            width="512"
                                                            height="512"
                                                            rx="15%"
                                                            fill="#2D8CFF" />
                                                        <path
                                                            fill="#ffffff"
                                                            d="M428 357c8 2 15-2 19-8 2-3 2-8 2-19V179c0-11 0-15-2-19-3-8-11-11-19-8-21 14-67 55-68 72-.8 3-.8 8-.8 15v38c0 8 0 11 .8 15 1 8 4 15 8 19 12 9 52 45 61 45zM64 187c0-15 0-23 3-27 2-4 8-8 11-11 4-3 11-3 27-3h129c38 0 57 0 72 8 11 8 23 15 30 30 8 15 8 34 8 72v68c0 15 0 23-3 27-2 4-8 8-11 11-4 3-11 3-27 3H174c-38 0-57 0-72-8-11-8-23-15-30-30-8-15-8-34-8-72z" />
                                                    </svg>
                                                    Zoom Meeting
                                                </span>
                                            </label>

                                            {location === 'zoom' && (
                                                <div className="ml-7 mt-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Zoom ID/Profile Link</label>
                                                    <input
                                                        type="text"
                                                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                                        placeholder="Enter your Zoom ID or profile link"
                                                    />
                                                </div>
                                            )}

                                            <label className="flex items-center p-3 border border-gray-200 rounded-md bg-white hover:border-blue-300 transition-colors cursor-pointer">
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="phone"
                                                    checked={location === 'phone'}
                                                    onChange={() => setLocation('phone')}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="ml-3 flex items-center text-gray-800">
                                                    <svg className="w-5 h-5 mr-2 text-blue-600"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512">
                                                        <rect
                                                            width="512"
                                                            height="512"
                                                            rx="15%"
                                                            fill="#2D8CFF" />
                                                        <path
                                                            fill="#ffffff"
                                                            d="M390 286.2c-8.7-8.7-19.3-13.5-30.8-13.5-11.5 0-22.2 4.8-30.9 13.5l-30.3 30.2c-2.4-1.3-4.7-2.4-7-3.6-3.3-1.7-6.4-3.2-9-4.8-26.8-17-51.3-39.1-74.5-67.7-11.3-14.3-18.9-26.3-24.4-38.6 7.4-6.7 14.2-13.7 20.9-20.5 2.5-2.5 5-5.1 7.5-7.6 18.9-18.9 18.9-43.3 0-62.2l-26.2-26.2c-3-3-5.9-5.9-8.8-8.9-5.7-5.8-11.5-11.8-17.5-17.4-8.7-8.7-19.2-13.3-30.7-13.3-11.5 0-22.1 4.6-31 13.3l-.2.2-32.6 32.8c-11.7 11.7-18.3 25.9-19.7 42.3-2 26.8 5.7 51.6 11.5 67.8 14.2 39.4 35.5 76 67.3 115.4 38.7 47.1 85.2 84.3 138.4 110.4 20.3 9.6 47.5 21 77.8 22.9 1.9.1 3.8.2 5.6.2 20.6 0 37.9-7.4 51.5-22.1 0-.1.1-.2.2-.3 4.7-5.6 10-10.7 15.6-16.1 3.8-3.6 7.7-7.4 11.5-11.3 8.8-9 13.5-19.6 13.5-31.1 0-11.5-4.8-22.1-13.7-30.9L390 286.2z" />
                                                    </svg>
                                                    Phone Call
                                                </span>
                                            </label>

                                            {location === 'phone' && (
                                                <div className="ml-7 mt-2">
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone number *</label>
                                                    <div className="flex">
                                                        <div className="relative">
                                                            <button
                                                                type="button"
                                                                className="flex items-center justify-between w-28 p-3 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
                                                                onClick={() => {
                                                                    const popup = document.getElementById('countryCodePopup');
                                                                    if (popup) popup.classList.toggle('hidden');
                                                                }}
                                                            >
                                                                <span id="selectedCountryCode">+1</span>
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                                </svg>
                                                            </button>

                                                            <div id="countryCodePopup" className="hidden absolute z-10 mt-1 w-72 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto custom-scrollbar-code">
                                                                <div className="p-2">
                                                                    <input
                                                                        type="text"
                                                                        placeholder="Search countries..."
                                                                        className="w-full p-2 border border-gray-300 rounded-md mb-2"
                                                                        onChange={(e) => {
                                                                            const searchTerm = e.target.value.toLowerCase();
                                                                            const buttons = document.querySelectorAll('.country-option');
                                                                            buttons.forEach(button => {
                                                                                const text = button.textContent?.toLowerCase() || '';
                                                                                if (text.includes(searchTerm)) {
                                                                                    (button as HTMLElement).style.display = 'block';
                                                                                } else {
                                                                                    (button as HTMLElement).style.display = 'none';
                                                                                }
                                                                            });
                                                                        }}
                                                                    />
                                                                    <div className="grid grid-cols-1 gap-1">
                                                                        {[
                                                                            { code: '+93', country: '- Afghanistan' },
                                                                            { code: '+355', country: '- Albania' },
                                                                            { code: '+213', country: '- Algeria' },
                                                                            { code: '+376', country: '- Andorra' },
                                                                            { code: '+244', country: '- Angola' },
                                                                            { code: '+54', country: '- Argentina' },
                                                                            { code: '+374', country: '- Armenia' },
                                                                            { code: '+297', country: '- Aruba' },
                                                                            { code: '+61', country: '- Australia' },
                                                                            { code: '+43', country: '- Austria' },
                                                                            { code: '+994', country: '- Azerbaijan' },
                                                                            { code: '+973', country: '- Bahrain' },
                                                                            { code: '+880', country: '- Bangladesh' },
                                                                            { code: '+375', country: '- Belarus' },
                                                                            { code: '+32', country: '- Belgium' },
                                                                            { code: '+501', country: '- Belize' },
                                                                            { code: '+229', country: '- Benin' },
                                                                            { code: '+975', country: '- Bhutan' },
                                                                            { code: '+591', country: '- Bolivia' },
                                                                            { code: '+387', country: '- Bosnia and Herzegovina' },
                                                                            { code: '+267', country: '- Botswana' },
                                                                            { code: '+55', country: '- Brazil' },
                                                                            { code: '+246', country: '- British Indian Ocean Territory' },
                                                                            { code: '+673', country: '- Brunei' },
                                                                            { code: '+359', country: '- Bulgaria' },
                                                                            { code: '+226', country: '- Burkina Faso' },
                                                                            { code: '+257', country: '- Burundi' },
                                                                            { code: '+855', country: '- Cambodia' },
                                                                            { code: '+237', country: '- Cameroon' },
                                                                            { code: '+1', country: '- Canada' },
                                                                            { code: '+238', country: '- Cape Verde' },
                                                                            { code: '+599', country: '- Caribbean Netherlands' },
                                                                            { code: '+236', country: '- Central African Republic' },
                                                                            { code: '+235', country: '- Chad' },
                                                                            { code: '+56', country: '- Chile' },
                                                                            { code: '+86', country: '- China' },
                                                                            { code: '+57', country: '- Colombia' },
                                                                            { code: '+269', country: '- Comoros' },
                                                                            { code: '+242', country: '- Republic of the Congo' },
                                                                            { code: '+682', country: '- Cook Islands' },
                                                                            { code: '+506', country: '- Costa Rica' },
                                                                            { code: '+385', country: '- Croatia' },
                                                                            { code: '+53', country: '- Cuba' },
                                                                            { code: '+357', country: '- Cyprus' },
                                                                            { code: '+420', country: '- Czech Republic' },
                                                                            { code: '+243', country: '- DR Congo' },
                                                                            { code: '+45', country: '- Denmark' },
                                                                            { code: '+253', country: '- Djibouti' },
                                                                            { code: '+670', country: '- East Timor' },
                                                                            { code: '+593', country: '- Ecuador' },
                                                                            { code: '+20', country: '- Egypt' },
                                                                            { code: '+503', country: '- El Salvador' },
                                                                            { code: '+240', country: '- Equatorial Guinea' },
                                                                            { code: '+291', country: '- Eritrea' },
                                                                            { code: '+372', country: '- Estonia' },
                                                                            { code: '+268', country: '- Eswatini' },
                                                                            { code: '+251', country: '- Ethiopia' },
                                                                            { code: '+500', country: '- Falkland Islands' },
                                                                            { code: '+298', country: '- Faroe Islands' },
                                                                            { code: '+679', country: '- Fiji' },
                                                                            { code: '+358', country: '- Finland' },
                                                                            { code: '+33', country: '- France' },
                                                                            { code: '+594', country: '- French Guiana' },
                                                                            { code: '+689', country: '- French Polynesia' },
                                                                            { code: '+241', country: '- Gabon' },
                                                                            { code: '+220', country: '- Gambia' },
                                                                            { code: '+995', country: '- Georgia' },
                                                                            { code: '+49', country: '- Germany' },
                                                                            { code: '+233', country: '- Ghana' },
                                                                            { code: '+350', country: '- Gibraltar' },
                                                                            { code: '+30', country: '- Greece' },
                                                                            { code: '+299', country: '- Greenland' },
                                                                            { code: '+590', country: '- Guadeloupe' },
                                                                            { code: '+502', country: '- Guatemala' },
                                                                            { code: '+224', country: '- Guinea' },
                                                                            { code: '+245', country: '- Guinea-Bissau' },
                                                                            { code: '+592', country: '- Guyana' },
                                                                            { code: '+509', country: '- Haiti' },
                                                                            { code: '+504', country: '- Honduras' },
                                                                            { code: '+852', country: '- Hong Kong' },
                                                                            { code: '+36', country: '- Hungary' },
                                                                            { code: '+354', country: '- Iceland' },
                                                                            { code: '+91', country: '- India' },
                                                                            { code: '+62', country: '- Indonesia' },
                                                                            { code: '+98', country: '- Iran' },
                                                                            { code: '+964', country: '- Iraq' },
                                                                            { code: '+353', country: '- Ireland' },
                                                                            { code: '+972', country: '- Israel' },
                                                                            { code: '+39', country: '- Italy' },
                                                                            { code: '+225', country: '- Côte d\'Ivoire' },
                                                                            { code: '+81', country: '- Japan' },
                                                                            { code: '+962', country: '- Jordan' },
                                                                            { code: '+7', country: '- Kazakhstan' },
                                                                            { code: '+254', country: '- Kenya' },
                                                                            { code: '+686', country: '- Kiribati' },
                                                                            { code: '+383', country: '- Kosovo' },
                                                                            { code: '+965', country: '- Kuwait' },
                                                                            { code: '+996', country: '- Kyrgyzstan' },
                                                                            { code: '+856', country: '- Laos' },
                                                                            { code: '+371', country: '- Latvia' },
                                                                            { code: '+961', country: '- Lebanon' },
                                                                            { code: '+266', country: '- Lesotho' },
                                                                            { code: '+231', country: '- Liberia' },
                                                                            { code: '+218', country: '- Libya' },
                                                                            { code: '+423', country: '- Liechtenstein' },
                                                                            { code: '+370', country: '- Lithuania' },
                                                                            { code: '+352', country: '- Luxembourg' },
                                                                            { code: '+853', country: '- Macau' },
                                                                            { code: '+389', country: '- North Macedonia' },
                                                                            { code: '+261', country: '- Madagascar' },
                                                                            { code: '+265', country: '- Malawi' },
                                                                            { code: '+60', country: '- Malaysia' },
                                                                            { code: '+960', country: '- Maldives' },
                                                                            { code: '+223', country: '- Mali' },
                                                                            { code: '+356', country: '- Malta' },
                                                                            { code: '+692', country: '- Marshall Islands' },
                                                                            { code: '+596', country: '- Martinique' },
                                                                            { code: '+230', country: '- Mauritius' },
                                                                            { code: '+52', country: '- Mexico' },
                                                                            { code: '+691', country: '- Micronesia' },
                                                                            { code: '+373', country: '- Moldova' },
                                                                            { code: '+377', country: '- Monaco' },
                                                                            { code: '+976', country: '- Mongolia' },
                                                                            { code: '+382', country: '- Montenegro' },
                                                                            { code: '+212', country: '- Morocco' },
                                                                            { code: '+258', country: '- Mozambique' },
                                                                            { code: '+95', country: '- Myanmar' },
                                                                            { code: '+264', country: '- Namibia' },
                                                                            { code: '+674', country: '- Nauru' },
                                                                            { code: '+977', country: '- Nepal' },
                                                                            { code: '+31', country: '- Netherlands' },
                                                                            { code: '+687', country: '- New Caledonia' },
                                                                            { code: '+64', country: '- New Zealand' },
                                                                            { code: '+505', country: '- Nicaragua' },
                                                                            { code: '+227', country: '- Niger' },
                                                                            { code: '+234', country: '- Nigeria' },
                                                                            { code: '+683', country: '- Niue' },
                                                                            { code: '+850', country: '- North Korea' },
                                                                            { code: '+672', country: '- Norfolk Island' },
                                                                            { code: '+47', country: '- Norway' },
                                                                            { code: '+968', country: '- Oman' },
                                                                            { code: '+92', country: '- Pakistan' },
                                                                            { code: '+680', country: '- Palau' },
                                                                            { code: '+970', country: '- Palestine' },
                                                                            { code: '+507', country: '- Panama' },
                                                                            { code: '+675', country: '- Papua New Guinea' },
                                                                            { code: '+595', country: '- Paraguay' },
                                                                            { code: '+51', country: '- Peru' },
                                                                            { code: '+63', country: '- Philippines' },
                                                                            { code: '+48', country: '- Poland' },
                                                                            { code: '+351', country: '- Portugal' },
                                                                            { code: '+1', country: '- Puerto Rico' },
                                                                            { code: '+974', country: '- Qatar' },
                                                                            { code: '+262', country: '- Réunion' },
                                                                            { code: '+40', country: '- Romania' },
                                                                            { code: '+7', country: '- Russia' },
                                                                            { code: '+250', country: '- Rwanda' },
                                                                            { code: '+290', country: '- Saint Helena' },
                                                                            { code: '+685', country: '- Samoa' },
                                                                            { code: '+378', country: '- San Marino' },
                                                                            { code: '+239', country: '- São Tomé and Príncipe' },
                                                                            { code: '+966', country: '- Saudi Arabia' },
                                                                            { code: '+221', country: '- Senegal' },
                                                                            { code: '+381', country: '- Serbia' },
                                                                            { code: '+248', country: '- Seychelles' },
                                                                            { code: '+232', country: '- Sierra Leone' },
                                                                            { code: '+65', country: '- Singapore' },
                                                                            { code: '+421', country: '- Slovakia' },
                                                                            { code: '+386', country: '- Slovenia' },
                                                                            { code: '+677', country: '- Solomon Islands' },
                                                                            { code: '+252', country: '- Somalia' },
                                                                            { code: '+27', country: '- South Africa' },
                                                                            { code: '+82', country: '- South Korea' },
                                                                            { code: '+34', country: '- Spain' },
                                                                            { code: '+94', country: '- Sri Lanka' },
                                                                            { code: '+249', country: '- Sudan' },
                                                                            { code: '+597', country: '- Suriname' },
                                                                            { code: '+46', country: '- Sweden' },
                                                                            { code: '+41', country: '- Switzerland' },
                                                                            { code: '+963', country: '- Syria' },
                                                                            { code: '+886', country: '- Taiwan' },
                                                                            { code: '+992', country: '- Tajikistan' },
                                                                            { code: '+255', country: '- Tanzania' },
                                                                            { code: '+66', country: '- Thailand' },
                                                                            { code: '+228', country: '- Togo' },
                                                                            { code: '+690', country: '- Tokelau' },
                                                                            { code: '+676', country: '- Tonga' },
                                                                            { code: '+216', country: '- Tunisia' },
                                                                            { code: '+90', country: '- Turkey' },
                                                                            { code: '+993', country: '- Turkmenistan' },
                                                                            { code: '+688', country: '- Tuvalu' },
                                                                            { code: '+256', country: '- Uganda' },
                                                                            { code: '+380', country: '- Ukraine' },
                                                                            { code: '+971', country: '- United Arab Emirates' },
                                                                            { code: '+44', country: '- United Kingdom' },
                                                                            { code: '+1', country: '- United States' },
                                                                            { code: '+598', country: '- Uruguay' },
                                                                            { code: '+998', country: '- Uzbekistan' },
                                                                            { code: '+678', country: '- Vanuatu' },
                                                                            { code: '+39', country: '- Vatican City' },
                                                                            { code: '+58', country: '- Venezuela' },
                                                                            { code: '+84', country: '- Vietnam' },
                                                                            { code: '+681', country: '- Wallis and Futuna' },
                                                                            { code: '+967', country: '- Yemen' },
                                                                            { code: '+260', country: '- Zambia' },
                                                                            { code: '+263', country: '- Zimbabwe' }
                                                                        ].map((item, index) => (
                                                                            <button
                                                                                key={index}
                                                                                type="button"
                                                                                className="country-option text-left p-2 hover:bg-gray-100 rounded-md flex items-center"
                                                                                onClick={() => {
                                                                                    const codeElement = document.getElementById('selectedCountryCode');
                                                                                    if (codeElement) codeElement.textContent = item.code;
                                                                                    const popup = document.getElementById('countryCodePopup');
                                                                                    if (popup) popup.classList.add('hidden');
                                                                                }}
                                                                            >
                                                                                <span className="font-medium mr-2">{item.code}</span>
                                                                                <span className="text-gray-600">{item.country}</span>
                                                                            </button>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="tel"
                                                            className="flex-1 p-3 border border-gray-300 border-l-0 rounded-r-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                                            placeholder="Enter your phone number"
                                                            required={location === 'phone'}
                                                        />
                                                    </div>

                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="pt-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Please share anything that will help prepare for our meeting
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                                            rows={4}
                                            placeholder="Share any specific topics you'd like to discuss or questions you have"
                                        />
                                    </div>

                                    <div className="pt-6">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-medium shadow-sm transition-colors"
                                        >
                                            {loading ? 'Scheduling...' : 'Schedule Event'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 3: Confirmation */}
                        {step === 3 && success && (
                            <div className="max-w-md mx-auto bg-white rounded-lg p-8">
                                <div className="flex justify-center mb-6">
                                    <CheckCircleIcon className="w-16 h-16 text-green-500" />
                                </div>

                                <h2 className="text-2xl font-bold text-center mb-3">You are scheduled</h2>
                                <p className="text-gray-600 text-center mb-8">A invitation link has been sent to your email address.</p>

                                {meetingDetails && (
                                    <div className="mb-8">
                                        <a 
                                            href={meetingDetails.join_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-center px-5 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors mb-4"
                                        >
                                            <svg className="w-5 h-5 mr-2 text-blue-600"
                                                xmlns="http://www.w3.org/2000/svg" 
                                                aria-label="Zoom"
                                                role="img"
                                                viewBox="0 0 512 512">
                                                <rect
                                                    width="512"
                                                    height="512"
                                                    rx="15%"
                                                    fill="#2D8CFF" />
                                                <path
                                                    fill="#ffffff"
                                                    d="M428 357c8 2 15-2 19-8 2-3 2-8 2-19V179c0-11 0-15-2-19-3-8-11-11-19-8-21 14-67 55-68 72-.8 3-.8 8-.8 15v38c0 8 0 11 .8 15 1 8 4 15 8 19 12 9 52 45 61 45zM64 187c0-15 0-23 3-27 2-4 8-8 11-11 4-3 11-3 27-3h129c38 0 57 0 72 8 11 8 23 15 30 30 8 15 8 34 8 72v68c0 15 0 23-3 27-2 4-8 8-11 11-4 3-11 3-27 3H174c-38 0-57 0-72-8-11-8-23-15-30-30-8-15-8-34-8-72z" />
                                            </svg>
                                            <span>Join Zoom Meeting</span>
                                        </a>
                                        
                                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 space-y-2">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Meeting ID:</span> {meetingDetails.id}
                                            </p>
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Passcode:</span> {meetingDetails.password}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {zoomError && (
                                    <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800 text-sm">
                                        {zoomError}
                                    </div>
                                )}

                                <button className="w-full flex items-center justify-center px-5 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors mb-8">
                                    <span>Open invitation</span>
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>

                                <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                                    <h3 className="font-semibold text-lg mb-3">Free Appointment</h3>
                                    <div className="flex items-center text-gray-700 mb-3">
                                        <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Khadija Zouine</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="text-sm">{selectedTime} - {format(addMinutes(new Date(selectedDate.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(' ')[0].split(':')[1]))), 30), 'h:mm a')}</span>
                                    </div>
                                    <div className="ml-8 text-sm text-gray-700 mt-1">
                                        {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                                    </div>

                                    {location === 'zoom' && meetingDetails && (
                                        <div className="flex items-center text-gray-700 mt-3">
                                            <svg className="w-5 h-5 mr-3 text-blue-500"
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-label="Zoom"
                                                role="img"
                                                viewBox="0 0 512 512">
                                                <rect
                                                    width="512"
                                                    height="512"
                                                    rx="15%"
                                                    fill="#2D8CFF" />
                                                <path
                                                    fill="#ffffff"
                                                    d="M428 357c8 2 15-2 19-8 2-3 2-8 2-19V179c0-11 0-15-2-19-3-8-11-11-19-8-21 14-67 55-68 72-.8 3-.8 8-.8 15v38c0 8 0 11 .8 15 1 8 4 15 8 19 12 9 52 45 61 45zM64 187c0-15 0-23 3-27 2-4 8-8 11-11 4-3 11-3 27-3h129c38 0 57 0 72 8 11 8 23 15 30 30 8 15 8 34 8 72v68c0 15 0 23-3 27-2 4-8 8-11 11-4 3-11 3-27 3H174c-38 0-57 0-72-8-11-8-23-15-30-30-8-15-8-34-8-72z" />
                                            </svg>
                                            <span className="text-sm">Via Zoom</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentBooking;