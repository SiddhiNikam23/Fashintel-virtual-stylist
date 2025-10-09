import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAuthDropdown, setShowAuthDropdown] = useState(false);

  useEffect(() => {
    // Add scroll animation for floating elements
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.floating-element');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        if (element) {
          element.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-icon')) {
        setShowAuthDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleStyleMe = async () => {
    setIsLoading(true);
    // Your API call to AI styling service would go here
    try {
      // Example: await fetch('/api/ai-style', { method: 'POST', body: userPreferences })
      alert('🎨 AI Stylist activated! Analyzing your preferences...');
    } catch (error) {
      console.error('Error calling AI stylist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Add debounced search functionality here
  };

  const toggleAuthDropdown = () => {
    setShowAuthDropdown(!showAuthDropdown);
  };

  const handleAuthRedirect = (type) => {
    setShowAuthDropdown(false);
    // Add your routing logic here
    if (type === 'login') {
      // For React Router: navigate('/login');
      // For Next.js: router.push('/login');
      window.location.href = '/login';
    } else if (type === 'register') {
      // For React Router: navigate('/register');
      // For Next.js: router.push('/register');
      window.location.href = '/register';
    }
  };

  const handleFeatureClick = (featureType) => {
    // Add your routing logic here
    const routes = {
      'style-analysis': '/style-analysis',
      'visual-search': '/visual-search',
      'trend-predictions': '/trend-predictions'
    };
    
    // For React Router: navigate(routes[featureType]);
    // For Next.js: router.push(routes[featureType]);
    window.location.href = routes[featureType];
  };

  return (
    <div className="dashboard-container">
      <style jsx>{`
        .dashboard-container {
          font-family: 'Arial', sans-serif;
          background: linear-gradient(135deg, #ff6b35, #f7931e, #ffd23f);
          min-height: 100vh;
        }

        /* Header */
        .header {
          background: white;
          padding: 10px 0;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
        }

        .logo {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(45deg, #e91e63, #9c27b0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .nav-links {
          display: flex;
          list-style: none;
          gap: 30px;
          margin: 0;
          padding: 0;
        }

        .nav-links li {
          font-weight: 600;
          color: #333;
          cursor: pointer;
          position: relative;
          transition: all 0.3s ease;
        }

        .nav-links li:hover {
          color: #e91e63;
          transform: translateY(-2px);
        }

        .new-badge {
          background: #e91e63;
          color: white;
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 10px;
          position: absolute;
          top: -8px;
          right: -15px;
        }

        .user-actions {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .search-box {
          padding: 8px 15px;
          border: 1px solid #ddd;
          border-radius: 20px;
          width: 300px;
          outline: none;
          transition: all 0.3s ease;
        }

        .search-box:focus {
          border-color: #e91e63;
          box-shadow: 0 0 10px rgba(233, 30, 99, 0.3);
        }

        .user-icon {
          text-align: center;
          cursor: pointer;
          color: #333;
          transition: color 0.3s ease;
          position: relative;
        }

        .user-icon:hover {
          color: #e91e63;
        }

        /* Auth Dropdown */
        .auth-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          z-index: 1000;
          min-width: 150px;
          margin-top: 5px;
        }

        .auth-dropdown-item {
          padding: 12px 16px;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
          transition: background-color 0.3s ease;
          font-weight: 600;
        }

        .auth-dropdown-item:last-child {
          border-bottom: none;
        }

        .auth-dropdown-item:hover {
          background-color: #f8f9fa;
          color: #e91e63;
        }

        .auth-dropdown-item:first-child {
          border-radius: 10px 10px 0 0;
        }

        .auth-dropdown-item:last-child {
          border-radius: 0 0 10px 10px;
        }

        /* Promo Banner */
        .promo-banner {
          background: linear-gradient(135deg, #ffd700, #ff8c00);
          text-align: center;
          padding: 15px;
          color: #8b4513;
          font-weight: bold;
          font-size: 18px;
        }

        .app-promo {
          background: linear-gradient(135deg, #ff6b35, #f7931e);
          color: white;
          text-align: center;
          padding: 12px;
          font-weight: bold;
          position: relative;
          overflow: hidden;
        }

        .app-promo::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        /* Main Festival Section */
        .festival-section {
          background: linear-gradient(135deg, #ff6b35, #ffd23f);
          padding: 40px 20px;
          position: relative;
          overflow: hidden;
        }

        .festival-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 30px;
          align-items: center;
        }

        .discount-left, .discount-right {
          text-align: center;
          color: white;
          position: relative;
        }

        .big-text {
          font-size: 80px;
          font-weight: bold;
          text-shadow: 3px 3px 0px #8b4513;
          transform: rotate(-5deg);
          line-height: 0.8;
        }

        .discount-text {
          font-size: 24px;
          font-weight: bold;
          margin-top: 10px;
        }

        .percentage-text {
          font-size: 60px;
          font-weight: bold;
          color: #ff1744;
          text-shadow: 2px 2px 0px white;
        }

        .center-badge {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
          padding: 30px;
          border-radius: 50px;
          color: white;
          text-align: center;
          position: relative;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
          transform: rotate(5deg);
        }

        .center-badge h2 {
          font-size: 36px;
          margin-bottom: 10px;
        }

        .center-badge h3 {
          font-size: 28px;
          margin-bottom: 5px;
        }

        .live-now {
          background: #4caf50;
          color: white;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          margin-top: 10px;
          display: inline-block;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-top: 30px;
        }

        .cta-button {
          background: linear-gradient(135deg, #9c27b0, #e91e63);
          color: white;
          padding: 15px 30px;
          border: none;
          border-radius: 30px;
          font-size: 18px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .cta-button:active {
          transform: scale(0.95);
        }

        .cta-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* AI Features Section */
        .ai-features {
          background: white;
          padding: 60px 20px;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .features-title {
          font-size: 48px;
          color: #333;
          margin-bottom: 20px;
          background: linear-gradient(45deg, #9c27b0, #e91e63);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin-top: 40px;
        }

        .feature-card {
          background: linear-gradient(135deg, #f8f9fa, #e9ecef);
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
          cursor: pointer;
          border: 2px solid transparent;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(156, 39, 176, 0.3);
          border-color: #9c27b0;
          background: linear-gradient(135deg, #ffffff, #f3e5f5);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .feature-title {
          font-size: 24px;
          color: #333;
          margin-bottom: 15px;
        }

        .feature-desc {
          color: #666;
          line-height: 1.6;
        }

        /* Sponsors Section */
        .sponsors {
          background: linear-gradient(135deg, #ffd23f, #ff6b35);
          padding: 30px 20px;
        }

        .sponsors-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          align-items: center;
        }

        .sponsor-card {
          background: rgba(255,255,255,0.9);
          padding: 20px;
          border-radius: 15px;
          text-align: center;
          backdrop-filter: blur(10px);
        }

        .sponsor-type {
          font-size: 14px;
          color: #9c27b0;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .sponsor-brand {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }

        .sponsor-tagline {
          font-size: 12px;
          color: #666;
          margin-top: 5px;
        }

        /* Floating Elements */
        .floating-element {
          position: absolute;
          animation: float 6s ease-in-out infinite;
          z-index: 1;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .star {
          color: #ffd700;
          font-size: 24px;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
          
          .festival-container {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .big-text {
            font-size: 50px;
          }
          
          .center-badge h2 {
            font-size: 24px;
          }
          
          .sponsors-container {
            grid-template-columns: 1fr;
          }
          
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .search-box {
            width: 200px;
          }
        }
      `}</style>

      {/* Header */}
      <header className="header">
        <div className="nav-container">
          <div className="logo">🎨 Fashintel</div>
          <nav>
            <ul className="nav-links">
              <li>WOMEN</li>
              <li>MEN</li>
              <li>KIDS</li>
              <li>HOME & LIVING</li>
              <li>BEAUTY</li>
              <li>
                AI STYLIST <span className="new-badge">NEW</span>
              </li>
            </ul>
          </nav>
          <div className="user-actions">
            
            <div className="user-icon" onClick={toggleAuthDropdown}>
              👤<br />Profile
              {showAuthDropdown && (
                <div className="auth-dropdown">
                  <div 
                    className="auth-dropdown-item"
                    onClick={() => handleAuthRedirect('login')}
                  >
                    🔑 Login
                  </div>
                  <div 
                    className="auth-dropdown-item"
                    onClick={() => handleAuthRedirect('register')}
                  >
                    📝 Sign Up
                  </div>
                </div>
              )}
            </div>
            <div className="user-icon">
              ❤️<br />Wishlist
            </div>
            <div className="user-icon">
              🛍️<br />Bag
            </div>
          </div>
        </div>
      </header>

      {/* Promo Banner */}
      <div className="promo-banner">
        FLAT ₹500 OFF on First AI Styling Session
      </div>

      {/* App Promo */}
      <div className="app-promo">
        Get 20% Extra Off via 🎨 Fashintel App! Download Now
      </div>

      {/* Main Festival Section */}
      <section className="festival-section">
        <div className="floating-element star" style={{top: '10%', left: '10%'}}>⭐</div>
        <div className="floating-element star" style={{top: '20%', right: '15%'}}>✨</div>
        <div className="floating-element star" style={{bottom: '30%', left: '20%'}}>🌟</div>
        <div className="floating-element star" style={{bottom: '40%', right: '10%'}}>💫</div>

        <div className="festival-container">
          <div className="discount-left">
            <div className="big-text">AI</div>
            <div className="discount-text">POWERED</div>
            <div className="percentage-text">90% ACCURATE</div>
          </div>

          <div className="center-badge">
            <h2>Smart</h2>
            <h3>Fashion</h3>
            <h3>Festival</h3>
            <div className="live-now">🔴 LIVE NOW</div>
          </div>

          <div className="discount-right">
            <div className="percentage-text">70-90%</div>
            <div className="discount-text">STYLE MATCH</div>
            <div className="big-text">OFF</div>
          </div>
        </div>

        <div className="cta-buttons">
          <button 
            className="cta-button" 
            onClick={handleStyleMe}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Analyzing...' : '👗 Style Me Now'}
          </button>
          <button className="cta-button">👔 For Him</button>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="ai-features">
        <div className="features-container">
          <h2 className="features-title">AI-Powered Style Intelligence</h2>
          <p style={{fontSize: '18px', color: '#666', marginBottom: '40px'}}>
            Experience personalized fashion like never before
          </p>
          
          <div className="features-grid">
            <div 
              className="feature-card"
              onClick={() => handleFeatureClick('style-analysis')}
            >
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">Smart Style Analysis</h3>
              <p className="feature-desc">
                Our AI analyzes your preferences, body type, and lifestyle to create 
                perfect outfit recommendations tailored just for you.
              </p>
            </div>
            
            <div 
              className="feature-card"
              onClick={() => handleFeatureClick('visual-search')}
            >
              <div className="feature-icon">👁️</div>
              <h3 className="feature-title">Visual Style Search</h3>
              <p className="feature-desc">
                Upload any fashion image and our AI will find similar styles and 
                complete looks from our extensive catalog.
              </p>
            </div>
            
            <div 
              className="feature-card"
              onClick={() => handleFeatureClick('trend-predictions')}
            >
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Trend Predictions</h3>
              <p className="feature-desc">
                Stay ahead of fashion trends with AI-powered predictions based on 
                global fashion data and social media insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors">
        <div className="sponsors-container">
          <div className="sponsor-card">
            <div className="sponsor-type">AI PARTNER</div>
            <div className="sponsor-brand">🧠 StyleAI</div>
            <div className="sponsor-tagline">Powering Smart Fashion</div>
          </div>
          
          <div className="sponsor-card">
            <div className="sponsor-type">FASHION PARTNER</div>
            <div className="sponsor-brand">👗 TrendCorp</div>
            <div className="sponsor-tagline">Global Fashion Network</div>
          </div>
          
          <div className="sponsor-card">
            <div className="sponsor-type">TECH PARTNER</div>
            <div className="sponsor-brand">⚡ FashTech</div>
            <div className="sponsor-tagline">Innovation in Style</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;