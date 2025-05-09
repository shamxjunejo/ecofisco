import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase/config';
import { doc, getDoc, setDoc, deleteDoc, addDoc, collection } from 'firebase/firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, deleteUser } from 'firebase/auth';
import { 
  LayoutDashboard, 
  Bell, 
  User, 
  FolderOpen, 
  HelpCircle, 
  Bug, 
  LogOut,
  Menu,
  X,
  CircleDot,
  FileText,
  Clock,
  Activity,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { UserProfile, PasswordChange } from '../types/user';
import '../styles/dashboard.css';
import OngoingPractices from './OngoingPractices';
import PendingPractices from './PendingPractices';

interface DashboardProps {
  setMobileMenuOpen?: (open: boolean) => void;
}

type Screen = 'home' | 'notifications' | 'profile' | 'documents' | 'assistance' | 'report' | 'ongoing-practices' | 'pending-practices';

interface MenuItem {
  icon: any;
  label: string;
  screen?: Screen;
  highlight?: boolean;
  action?: () => void;
}

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  taxId: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  birthCity: string;
  birthProvince: string;
  signature?: string;
}

interface Report {
  id?: string;
  title: string;
  description: string;
  userId: string;
  userName: string;
  createdAt: string;
  status: 'pending' | 'in-progress' | 'resolved';
}

export default function Dashboard({ setMobileMenuOpen }: DashboardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, loading] = useAuthState(auth);
  const [showSidebar, setShowSidebar] = useState(false);
  const [userName, setUserName] = useState('User');
  const [userInitials, setUserInitials] = useState('U');
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [screenHistory, setScreenHistory] = useState<Screen[]>(['home']);
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    taxId: '',
    address: '',
    postalCode: '',
    city: '',
    province: '',
    birthCity: '',
    birthProvince: '',
  });
  const [passwordData, setPasswordData] = useState<PasswordChange>({
    currentPassword: '',
    confirmPassword: '',
    newPassword: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [report, setReport] = useState<Report>({
    title: '',
    description: '',
    userId: '',
    userName: '',
    createdAt: '',
    status: 'pending'
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const screenParam = params.get('screen');
    if (screenParam && ['home', 'notifications', 'profile', 'documents', 'assistance', 'report', 'ongoing-practices', 'pending-practices'].includes(screenParam)) {
      setCurrentScreen(screenParam as Screen);
    }
  }, [location.search]);

  useEffect(() => {
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      const formattedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      setUserName(formattedName);
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const loadProfile = async () => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as Profile);
        }
      }
    };
    loadProfile();
  }, [user]);

  useEffect(() => {
    if (profile.firstName && profile.lastName) {
      const firstInitial = profile.firstName.charAt(0).toUpperCase();
      const lastInitial = profile.lastName.charAt(0).toUpperCase();
      setUserInitials(`${firstInitial}${lastInitial}`);
    } else if (user?.email) {
      const emailName = user.email.split('@')[0];
      const formattedName = emailName.charAt(0).toUpperCase();
      setUserInitials(formattedName);
    }
  }, [profile.firstName, profile.lastName, user]);

  const handleLogout = () => {
    auth.signOut();
  };

  const menuItems: MenuItem[] = [
    { icon: LayoutDashboard, label: 'Home', screen: 'home' },
    { icon: Bell, label: 'Notifications', screen: 'notifications' },
    { icon: User, label: 'Profile', screen: 'profile' },
    { icon: FileText, label: 'Documents', screen: 'documents' },
    { icon: HelpCircle, label: 'Assistance', screen: 'assistance' },
    { icon: Bug, label: 'Report Malfunction', screen: 'report' },
    { icon: LogOut, label: 'Logout', action: handleLogout }
  ];

  const stats = [
    { 
      value: '0', 
      label: 'Pending practices',
      icon: Clock,
      color: 'from-amber-400 to-orange-500',
      textColor: 'text-orange-600'
    },
    { 
      value: '0', 
      label: 'Ongoing practices',
      icon: Activity,
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600'
    },
    { 
      value: '1', 
      label: 'Completed procedures',
      icon: CheckCircle,
      color: 'from-green-400 to-green-600',
      textColor: 'text-green-600'
    },
    { 
      value: '0', 
      label: 'Appointments',
      icon: Calendar,
      color: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-600'
    }
  ];

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.screen) {
      setScreenHistory(prev => [...prev, item.screen as Screen]);
      setCurrentScreen(item.screen);
    }
    setShowSidebar(false);
  };

  const handleBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop(); // Remove current screen
      const previousScreen = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(previousScreen);
    }
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReportChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setReport(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveProfile = async () => {
    if (user) {
      try {
        setError(''); // Clear any previous errors
        setSuccess(''); // Clear any previous success message
        await setDoc(doc(db, 'users', user.uid), profile);
        setSuccess('Profile updated successfully!');
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      } catch (error) {
        console.error('Error saving profile:', error);
        setError('Failed to update profile. Please try again.');
      }
    }
  };

  const updateUserPassword = async () => {
    if (!user || !user.email) return;
    
    try {
      setError('');

      if (passwordData.currentPassword !== passwordData.confirmPassword) {
        throw new Error('Current password confirmation does not match');
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        passwordData.currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, passwordData.newPassword);

      setSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        confirmPassword: '',
        newPassword: '',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to update password');
    }
  };

  const handleDeleteProfile = async () => {
    if (!user) return;
    
    if (window.confirm('Are you sure you want to delete your profile? This action cannot be undone.')) {
      try {
        await deleteDoc(doc(db, 'users', user.uid));
        await deleteUser(user);
        navigate('/login');
      } catch (err) {
        setError('Failed to delete profile');
        console.error(err);
      }
    }
  };

  const submitReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      setError('');
      setSuccess('');

      const newReport = {
        ...report,
        userId: user.uid,
        userName: `${profile.firstName} ${profile.lastName}`,
        createdAt: new Date().toISOString(),
        status: 'pending' as const
      };

      await addDoc(collection(db, 'reports'), newReport);
      setSuccess('Report submitted successfully!');
      
      // Reset form
      setReport({
        title: '',
        description: '',
        userId: '',
        userName: '',
        createdAt: '',
        status: 'pending'
      });

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      console.error('Error submitting report:', error);
      setError('Failed to submit report. Please try again.');
    }
  };

  const renderScreenContent = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index} 
                    className="relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
                    onClick={() => {
                      if (stat.label === 'Ongoing practices') {
                        setCurrentScreen('ongoing-practices');
                      } else if (stat.label === 'Pending practices') {
                        setCurrentScreen('pending-practices');
                      }
                    }}
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 opacity-10 transform translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${stat.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-3xl font-bold ${stat.textColor} mb-2`}>
                          {stat.value}
                        </span>
                        <span className="text-sm font-medium text-gray-600">
                          {stat.label}
                        </span>
                      </div>
                    </div>
                    <div className={`h-1 w-full bg-gradient-to-r ${stat.color}`}></div>
                  </div>
                );
              })}
            </div>

            {/* No Practices Section */}
            <div 
              className="bg-white rounded-[20px] p-8 text-center"
            >
              <svg 
                className="w-24 h-24 mx-auto mb-6 text-gray-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 7v10c0 2 1 3 3 3h12c2 0 3-1 3-3V7c0-2-1-3-3-3H6c-2 0-3 1-3 3Z" />
                <path d="m9.5 10.5 2 2 4-4" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No practice yet</h3>
              <p className="text-gray-500 text-sm mb-6">
                Purchase one of the over 100 welfare services available to you and wait comfortably for your completed application.
              </p>
              <button 
                onClick={() => navigate('/services')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition-colors"
              >
                See our services
              </button>
            </div>
          </div>
        );
      
      case 'notifications':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Notifications</h2>
            <p className="text-gray-500">No new notifications</p>
          </div>
        );

      case 'profile':
        return (
          <div className="container-fluid">
            <section>
              <div className="row">
                <div className="col-12">
                  <div className="my-2 testo-dashbard">
                    <div className="fs-2 text-black">
                      Personal Information
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={profile.firstName}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>Surname</label>
                    <input
                      type="text"
                      name="lastName"
                      value={profile.lastName}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your surname"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>E-mail</label>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>Telephone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>Date of birth</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={profile.dateOfBirth}
                      onChange={handleProfileChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>Tax ID code</label>
                    <input
                      type="text"
                      name="taxId"
                      value={profile.taxId}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your tax ID code"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-5">
                  <div className="form-control-wrapper">
                    <label>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-1">
                  <div className="form-control-wrapper">
                    <label>Cap</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={profile.postalCode}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Cap"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-4">
                  <div className="form-control-wrapper">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={profile.city}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your city"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-2">
                  <div className="form-control-wrapper">
                    <label>Province</label>
                    <input
                      type="text"
                      name="province"
                      value={profile.province}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Province"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>City of birth</label>
                    <input
                      type="text"
                      name="birthCity"
                      value={profile.birthCity}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your city of birth"
                    />
                  </div>
                </div>
                <div className="px-2 col-12 col-md-6">
                  <div className="form-control-wrapper">
                    <label>Province of birth</label>
                    <input
                      type="text"
                      name="birthProvince"
                      value={profile.birthProvince}
                      onChange={handleProfileChange}
                      className="form-control"
                      placeholder="Enter your province of birth"
                    />
                  </div>
                </div>
                <div className="col-12 text-center px-2 mt-3">
                  <button
                    type="button"
                    onClick={saveProfile}
                    className="btn btn-primary"
                  >
                    Confirm
                  </button>
                  {success && (
                    <div className="mt-3 text-sm text-green-600 bg-green-50 rounded-md p-3 w-100">
                      {success}
                    </div>
                  )}
                  {error && (
                    <div className="mt-3 text-sm text-red-600 bg-red-50 rounded-md p-3 w-100">
                      {error}
                    </div>
                  )}
                </div>
              </div>


              <div className="px-3 montserrat d-flex flex-column w-100">
                <div className="fs-4 text-primary">Change your password</div>
                <div className="row">
                  <div className="px-2 col-12 col-md-6">
                    <div className="form-control-wrapper">
                      <label>Current password</label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="px-2 col-12 col-md-6">
                    <div className="form-control-wrapper">
                      <label>Confirm current password</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`form-control ${
                          passwordData.currentPassword !== passwordData.confirmPassword ? 'is-invalid' : ''
                        }`}
                      />
                    </div>
                  </div>
                  <div className="px-2 col-12 col-md-6">
                    <div className="form-control-wrapper">
                      <label>New Password</label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-12 text-center text-lg-start px-2 mt-3" 
                       style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
                    <button
                      type="button"
                      onClick={updateUserPassword}
                      disabled={loading || !passwordData.currentPassword || !passwordData.confirmPassword || !passwordData.newPassword}
                      className="btn btn-primary text-white fs-5 text-decoration-none py-2 px-5"
                    >
                      {loading ? 'Updating...' : 'Confirm'}
                    </button>
                  </div>
                  <br /><br />
                  <div className="col-12 text-center text-lg-start px-2 mt-3">
                    <button
                      type="button"
                      onClick={handleDeleteProfile}
                      className="border-0 text-primary bg-transparent float-end no-border"
                      style={{ textDecoration: 'underline' }}
                    >
                      Delete profile
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'documents':
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-medium text-gray-900 mb-4">Document Archive</h2>
            <p className="text-gray-500">No documents available</p>
          </div>
        );

      case 'assistance':
        return (
          <div className="container-fluid">
            <section>
              <div className="row">
                <div className="col-12">
                  <div className="my-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Hey <span className="text-blue-600">{profile.firstName}</span>, do you need help?
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                    You're important to us — that's why we offer the widest range of channels to reach our customer support. Pick the method that suits you best and get the help you need.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 ">
                {/* WhatsApp Card */}
                <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-gray-300">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 mb-6 flex items-center justify-center bg-green-50 rounded-full">
                      <svg className="w-12 h-12 text-green-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Write on WhatsApp</h3>
                    <a 
                      href="https://wa.me/393516737374" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      Talk to us
                    </a>
                  </div>
                </div>

                {/* Email Card */}
                <div className="bg-white rounded-2xl p-8 transition-all duration-300 hover:shadow-lg border border-gray-300">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 mb-6 flex items-center justify-center bg-blue-50 rounded-full">
                      <svg className="w-12 h-12 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Send an email</h3>
                    <a 
                      href="mailto:ecofisco7@gmail.com"
                      className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-300"
                    >
                      Write to us
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'report':
        return (
          <div className="container-fluid">
            <section>
              <div className="row">
                <div className="col-12">
                  <div className="my-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      Report a malfunction
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto">
                      <span className="font-semibold text-gray-600">{profile.firstName}</span>, 
                      We're constantly improving to provide the best experience possible. If you've encountered any issues with E-Co Fisco, we sincerely apologize. Please share your feedback using the form below so our developers can resolve it quickly.
                    </p>
                  </div>
                </div>
              </div>

              <form className="max-w-3xl mx-auto" onSubmit={submitReport}>
                <div className="space-y-6">
                  {/* Title Input */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={report.title}
                      onChange={handleReportChange}
                      required
                      className="w-full px-4 py-3 rounded-[15px] border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter a title for your report"
                    />
                  </div>

                  {/* Description Input */}
                  <div className="form-group">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={report.description}
                      onChange={handleReportChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-[15px] focus:border-blue-500 transition-colors"
                      placeholder="Please describe in detail the type of malfunction you encountered."
                    />
                  </div>

                  {/* Submit Button and Messages */}
                  <div className="flex flex-col items-center gap-4">
                    <button
                      type="submit"
                      className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Send report
                    </button>
                    {success && (
                      <div className="w-full text-center text-sm text-green-600 bg-green-50 rounded-md p-3">
                        {success}
                      </div>
                    )}
                    {error && (
                      <div className="w-full text-center text-sm text-red-600 bg-red-50 rounded-md p-3">
                        {error}
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </section>
          </div>
        );

      case 'ongoing-practices':
        return <OngoingPractices />;

      case 'pending-practices':
        return <PendingPractices />;

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed position */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 flex items-center justify-center border-b border-blue-800">
            <h2 className="text-white text-xl font-bold">E-Co Fisco</h2>
          </div>

          {/* Menu Items */}
          <div className="flex-1 py-4 overflow-y-auto">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => handleMenuClick(item)}
                className={`menu-item ${item.screen && item.screen === currentScreen ? 'active' : ''} ${item.highlight ? 'highlight' : ''}`}
              >
                <div className="menu-icon">
                  <item.icon size={20} />
                </div>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-blue-800 bg-blue-950">
            <div className="text-center space-y-2">
              <p className="text-blue-200 text-sm font-light">Copyright © 2025 E-Co Fisco</p>
              <p className="text-blue-300 text-xs font-light">VAT number: 12744510012</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - With proper margin to avoid sidebar overlap */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white shadow-md p-4 flex justify-between items-center">
          <div className="flex items-center">
            {screenHistory.length > 1 && (
              <button
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h2 className="text-xl font-bold text-blue-900">E-Co Fisco</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="notification-badge">1</div>
              <Bell className="text-gray-400" size={24} />
            </div>
            <button onClick={toggleSidebar} className="text-gray-700">
              {showSidebar ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:flex bg-white shadow-md p-4 justify-between items-center">
          <div className="flex items-center">
            {screenHistory.length > 1 && (
              <button
                onClick={handleBack}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            <h3 className="text-xl font-bold text-blue-700">
              {currentScreen === 'home' ? 'Dashboard' : 
               currentScreen === 'ongoing-practices' ? 'Ongoing Practices' :
               currentScreen === 'notifications' ? 'Notifications' :
               currentScreen === 'profile' ? 'Personal Information' :
               currentScreen === 'documents' ? 'Document Archive' :
               currentScreen === 'assistance' ? 'Assistance' :
               currentScreen === 'report' ? 'Report Malfunction' :
               currentScreen === 'pending-practices' ? 'Pending Practices' : ''}
            </h3>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="notification-badge">1</div>
              <Bell className="text-gray-400" size={24} />
            </div>
            <div className="user-avatar">
              {userInitials}
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content flex-1">
          {/* Welcome Section - Only show on home screen */}
          {currentScreen === 'home' && (
            <div className="flex items-center mb-6">
              <div className="bg-blue-600 w-8 h-8 flex items-center justify-center rounded text-white font-medium mr-3">
                {userInitials}
              </div>
              <div>
                <h2 className="text-xl font-bold text-blue-700">
                  Hello{profile.firstName && profile.lastName ? ` ${profile.firstName} ${profile.lastName}` : ''} !
                </h2>
                <p className="text-gray-500 text-sm">Welcome to E-Co Fisco</p>
              </div>
            </div>
          )}

          {/* Screen Content */}
          {renderScreenContent()}
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
} 