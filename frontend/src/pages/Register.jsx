import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Sparkles, ShoppingBag } from 'lucide-react';

// 🌐 Dynamic API URL (same as Login.jsx)
const API =
  process.env.NODE_ENV === "production"
    ? "https://fashintel-virtual-stylist.onrender.com"   // <-- Update this after Render backend deploy
    : "http://localhost:5000";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('error');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      // 🌐 FIXED FETCH — uses dynamic API URL
      const response = await fetch(`${API}/api/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
          email: formData.email.trim(),
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.user) localStorage.setItem('userData', JSON.stringify(data.user));
        if (data.token) localStorage.setItem('authToken', data.token);

        setPopupType('success');
        setPopupMessage('Account created successfully! Welcome to Fashintel!');
        setShowPopup(true);

        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });

      } else {
        throw new Error(data.error || data.message || 'Registration failed');
      }

    } catch (error) {
      console.error('Registration error:', error);
      setPopupType('error');
      setPopupMessage(
        error.message === 'Failed to fetch'
          ? 'Network error. Please try again.'
          : error.message || 'Registration failed. Please try again.'
      );
      setShowPopup(true);

    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    if (popupType === 'success') navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">

      {/* (✨ UI stays the exact same, no changes below this) */}

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">

          <div className="text-center mb-8 relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
              Join Fashintel
            </h1>
            <p className="text-gray-600">Create your fashion-forward account</p>
            <div className="flex items-center justify-center mt-2 text-sm text-purple-600">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Discover your style</span>
            </div>
          </div>

          {/* FORM STARTS */}
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

            {/* UI stays same */}

            {/* Names */}
            <div className="grid grid-cols-2 gap-4">
              {/* First name */}
              {/* ... unchanged code ... */}
            </div>

            {/* Email */}
            {/* ... unchanged code ... */}

            {/* Password */}
            {/* ... unchanged code ... */}

            {/* Confirm Password */}
            {/* ... unchanged code ... */}

            {/* Submit button */}
            {/* ... unchanged code ... */}

            {/* Login link */}
            {/* ... unchanged code ... */}

          </form>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          {/* ... unchanged popup code ... */}
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
