import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ShoppingBag, Sparkles } from 'lucide-react';

// (Keep your InputField, PopupModal, LoadingButton, etc. same as before) ...

const useLoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('error');
  const [showPopup, setShowPopup] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setPopupType('success');
        setPopupMessage('Login successful! Redirecting to dashboard...');
        setShowPopup(true);

        // Save user and token
        if (data.user) {
          localStorage.setItem('userData', JSON.stringify(data.user));
        }
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }

        setFormData({ email: '', password: '' });

        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1500);
      } else {
        throw new Error(data.error || data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setPopupType('error');
      setPopupMessage(
        error.message === 'Failed to fetch'
        ? 'Network error. Please check your connection and try again.'
        : error.message || 'Login failed. Please try again.'
      );
      setShowPopup(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const navigateToRegister = () => {
    window.location.href = '/register';
  };

  const navigateToForgotPassword = () => {
    window.location.href = '/forgot-password';
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return {
    formData,
    showPassword,
    setShowPassword,
    errors,
    isLoading,
    popupMessage,
    popupType,
    showPopup,
    handleInputChange,
    handleSubmit,
    closePopup,
    navigateToRegister,
    navigateToForgotPassword,
    handleKeyPress
  };
};

const LoginPage = () => {
  const {
    formData,
    showPassword,
    setShowPassword,
    errors,
    isLoading,
    popupMessage,
    popupType,
    showPopup,
    handleInputChange,
    handleSubmit,
    closePopup,
    navigateToRegister,
    navigateToForgotPassword,
    handleKeyPress
  } = useLoginForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      {/* BackgroundElements if any */}

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* BackgroundElements */}

          <div className="text-center mb-8 relative z-10">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-2xl shadow-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Log in to your Fashintel account</p>
            <div className="flex items-center justify-center mt-2 text-sm text-purple-600">
              <Sparkles className="w-4 h-4 mr-1" />
              <span>Your style awaits</span>
            </div>
          </div>

          <div className="space-y-6 relative z-10" onKeyPress={handleKeyPress}>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/50 ${
                    errors.email ? 'border-red-300 focus:border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="john@example.com"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/50 ${
                    errors.password ? 'border-red-300 focus:border-red-400' : 'border-gray-200'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="text-right">
              <span
                onClick={navigateToForgotPassword}
                className="text-sm text-purple-600 hover:text-purple-700 hover:underline transition-colors cursor-pointer"
              >
                Forgot password?
              </span>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-[1.02] focus:scale-[0.98] shadow-lg ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:shadow-xl hover:shadow-purple-200'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Logging in...
                </div>
              ) : 'Login'}
            </button>

            <div className="text-center pt-4 border-t border-gray-200">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <span
                  onClick={navigateToRegister}
                  className="text-purple-600 hover:text-purple-700 font-semibold hover:underline cursor-pointer transition-colors"
                >
                  Register here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
                popupType === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {popupType === 'success' ? (
                  <Sparkles className="w-8 h-8 text-green-600" />
                ) : (
                  <div className="w-8 h-8 text-red-600 text-2xl font-bold">!</div>
                )}
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${
                popupType === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {popupType === 'success' ? 'Success!' : 'Error'}
              </h3>
              <p className="text-gray-600 mb-6">{popupMessage}</p>
              <button
                onClick={closePopup}
                className={`px-6 py-2 rounded-xl font-semibold text-white transition-colors ${
                  popupType === 'success' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
