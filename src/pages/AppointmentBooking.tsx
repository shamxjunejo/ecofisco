import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { format, addDays, startOfDay, addMinutes, isToday, isTomorrow, isThisWeek } from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/solid';

interface TimeSlot {
    time: string;
    available: boolean;
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
        try {
            await addDoc(collection(db, 'appointments'), {
                name,
                email,
                date: format(selectedDate, 'yyyy-MM-dd'),
                time: selectedTime,
                location,
                notes,
                createdAt: new Date().toISOString(),
                status: 'pending'
            });

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
       
<div className="min-h-screen font-poppins">
  <div className="max-w-6xl mx-auto p-4">
    <div className="rounded-xl mt-8 overflow-hidden flex flex-col md:flex-row border border-gray-200">
      
      {/* Left Column - Information */}
      <div className="md:w-1/4 bg-gray-50 p-5 border-r border-gray-200">
        <div className="sticky top-4">
          <h1 className="text-lg font-bold text-blue-600">Khadija Zouine</h1>
          <h3 className="font-medium text-gray-600 text-sm mb-2">Immigration & Tax Consultant</h3>
          <div className="border-t border-gray-200 my-3"></div>
          
          <h2 className="text-base font-semibold text-gray-800">Free Appointment</h2>
          <div className="flex items-center mt-1 text-gray-500 text-sm">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>30 min</span>
          </div>

          {step === 2 && selectedTime && (
              <div className="mt-4 bg-white p-3 rounded-md border border-gray-200 shadow-sm">
                  <div className="flex items-center text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>
                          {selectedTime} - {format(addMinutes(new Date(selectedDate.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(' ')[0].split(':')[1]))), 30), 'h:mm a')}, {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                      </span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mt-1">
                      <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                      </svg>
                      <span>Pakistan, Maldives Time</span>
                  </div>
              </div>
          )}

          <div className="mt-4">
              <p className="text-gray-800 text-sm">
                  <span className="font-semibold">Do you have questions about our services?</span>
              </p>

              <p className="mt-3 text-sm text-gray-600">
                  Book a free 30-minute <span className="text-blue-600 font-medium">information call</span> with us!
              </p>
          </div>

          <div className="border-t border-gray-200 my-4"></div>

          <div className="mt-4">
              <h3 className="font-medium text-gray-800 text-sm mb-2">What to expect</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Free consultation to understand your needs</span>
                  </li>
                  <li className="flex items-start">
                      <svg className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Overview of our services and how we can help</span>
                  </li>
              </ul>
          </div>
        </div>
      </div>

      {/* Middle Column - Calendar */}
      <div className="md:w-5/12 bg-white p-4">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Select a Date</h3>

            {/* Calendar */}
            <div className="mb-4 border border-gray-100 rounded-lg p-3 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <button
                  onClick={() => navigateMonth('prev')}
                  className="p-1 rounded-full hover:bg-indigo-50 transition-colors duration-200 text-gray-600 hover:text-indigo-600"
                >
                  <ChevronLeftIcon className="w-4 h-4" />
                </button>
                <h3 className="font-medium text-sm text-gray-800">{currentMonth}</h3>
                <button
                  onClick={() => navigateMonth('next')}
                  className="p-1 rounded-full hover:bg-indigo-50 transition-colors duration-200 text-gray-600 hover:text-indigo-600"
                >
                  <ChevronRightIcon className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-7 gap-1">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
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
                        h-7 w-7 flex items-center justify-center rounded-full text-xs transition-all duration-200
                        ${!day.isCurrentMonth ? 'text-gray-300' : ''}
                        ${isPast ? 'cursor-not-allowed text-gray-300' : ''}
                        ${!isAvailableDay && day.isCurrentMonth ? 'text-gray-400' : ''}
                        ${isSelected ? 'bg-blue-600 text-white shadow-sm' : ''}
                        ${!isDisabled && !isSelected ? 'hover:bg-indigo-100 hover:text-indigo-700' : ''}
                      `}
                    >
                      <span className={`${isAvailableDay && !isDisabled && !isSelected ? 'relative' : ''}`}>
                        {format(day.date, 'd')}
                        {isAvailableDay && !isDisabled && !isSelected && (
                          <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full"></span>
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-gray-600 mt-2 mb-2">
              <p>Available days: Wednesdays and Saturdays</p>
              <p>Available hours: 10:00 AM - 1:00 PM</p>
              <p className="mt-3">Time zone: Pakistan, Maldives Time (6:00pm)</p>
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Time Slots */}
      <div className="md:w-1/3 bg-white p-4 border-l border-gray-200">
        {step === 1 && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-3">Available Times</h3>
            
            <div className="h-60 overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-2 gap-2">
                {timeSlots.map((slot, index) => (
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
                      relative py-3 rounded-md text-center transition-all duration-200
                      ${slot.available
                        ? 'bg-white border border-blue-100 hover:border-blue-500 hover:bg-blue-50 text-gray-700 hover:text-blue-700 shadow-sm hover:shadow'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-100'
                      }
                    `}
                  >
                    <span className="font-medium">{slot.time}</span>
                    {!slot.available && (
                      <span className="absolute top-1 right-1 text-xs text-gray-400">
                        Unavailable
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Select your preferred time slot to continue
              </p>
            </div>
          </div>
        )}
      
       
      
    

                        {/* Step 2: Enter Details */}
                        {step === 2 && (
                            <div className="p-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex items-center text-blue-600 mb-4"
                                >
                                    <ArrowLeftIcon className="w-4 h-4 mr-1" />
                                    <span>Back</span>
                                </button>

                                <h2 className="text-lg font-semibold mb-4">Enter Details</h2>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <button
                                            type="button"
                                            className="text-blue-600 text-sm hover:underline"
                                        >
                                            Add Guests
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                                        <div className="space-y-2">
                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="zoom"
                                                    checked={location === 'zoom'}
                                                    onChange={() => setLocation('zoom')}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                                        <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm4.151 16.464h-2.16c-.993 0-1.763-.771-1.763-1.765V9.95c0-.993.77-1.765 1.763-1.765h2.16c.315 0 .611.121.836.342l3.986 3.986a1.168 1.168 0 010 1.649l-3.986 3.986a1.168 1.168 0 01-.836.342v-.027z" />
                                                    </svg>
                                                    Zoom
                                                </span>
                                            </label>

                                            <label className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name="location"
                                                    value="phone"
                                                    checked={location === 'phone'}
                                                    onChange={() => setLocation('phone')}
                                                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                                                />
                                                <span className="ml-2 flex items-center">
                                                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                    Phone call
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Please share anything that will help prepare for our meeting.
                                        </label>
                                        <textarea
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            rows={4}
                                        />
                                    </div>

                                    <div className="text-sm text-gray-600 mt-4">
                                        By proceeding, you confirm that you have read and agree to Calendly's Terms of Use and Privacy Notice.
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300 font-medium"
                                        >
                                            {loading ? 'Scheduling...' : 'Schedule Event'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Step 3: Confirmation */}
                        {step === 3 && success && (
                            <div className="p-6 text-center">
                                <div className="flex justify-center mb-4">
                                    <CheckCircleIcon className="w-12 h-12 text-green-500" />
                                </div>

                                <h2 className="text-xl font-semibold mb-2">You are scheduled</h2>
                                <p className="text-gray-600 mb-6">A calendar invitation has been sent to your email address.</p>

                                <button className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-6">
                                    <span>Open invitation</span>
                                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                </button>

                                <div className="border border-gray-200 rounded-md p-4 max-w-xs mx-auto text-left">
                                    <h3 className="font-medium">Free Appointment</h3>
                                    <div className="flex items-center text-gray-600 mt-2">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Khadija Zouine</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mt-1">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span>{selectedTime} - {format(addMinutes(new Date(selectedDate.setHours(parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(' ')[0].split(':')[1]))), 30), 'h:mm a')}, {format(selectedDate, 'EEEE, MMMM d, yyyy')}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mt-1">
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                                        </svg>
                                        <span>Pakistan, Maldives Time</span>
                                    </div>
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
