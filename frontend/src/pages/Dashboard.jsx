import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleStyleMe = async () => {
    setIsLoading(true);
    try {
      alert('✨ AI Stylist activated! Analyzing your preferences...');
    } catch (error) {
      console.error('Error calling AI stylist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureClick = (featureType) => {
    const routes = {
      'style-analysis': '/style-analysis',
      'visual-search': '/visual-search',
      'trend-predictions': '/trend-predictions'
    };
    window.location.href = routes[featureType];
  };

  return (
    <div className="dashboard-container">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .dashboard-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%);
          min-height: 100vh;
        }

        .promo-banner {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
          text-align: center;
          padding: 14px;
          color: white;
          font-weight: 600;
          font-size: 14px;
        }

        .festival-section {
          background: linear-gradient(180deg, #faf5ff 0%, #fdf4ff 50%, #fef3f2 100%);
          padding: 80px 40px;
          position: relative;
          overflow: hidden;
        }

        .festival-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 40px;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          text-align: center;
          max-width: 800px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          padding: 8px 20px;
          border-radius: 24px;
          font-size: 13px;
          font-weight: 600;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 24px;
          box-shadow: 0 4px 16px rgba(168, 85, 247, 0.12);
        }

        .hero-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 72px;
          font-weight: 700;
          color: #111;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.5px;
        }

        .hero-subtitle {
          font-size: 20px;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 16px;
          font-weight: 400;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 48px;
          margin-top: 32px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 700;
          color: #a855f7;
          line-height: 1.2;
        }

        .stat-label {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
          margin-top: 4px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-top: 40px;
        }

        .cta-button {
          background: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f97316 100%);
          color: white;
          padding: 16px 40px;
          border: none;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.25);
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 32px rgba(168, 85, 247, 0.35);
        }

        .cta-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cta-button-secondary {
          background: white;
          color: #a855f7;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          border: 1.5px solid #e2e8f0;
        }

        .cta-button-secondary:hover {
          background: #faf5ff;
          border-color: #a855f7;
          box-shadow: 0 8px 24px rgba(168, 85, 247, 0.15);
        }

        .shop-trends {
          padding: 100px 40px;
          background: #fff;
          text-align: center;
        }

        .trends-title {
          font-size: 42px;
          font-weight: 700;
          color: #1e1b4b;
          margin-bottom: 48px;
        }

        .trends-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 32px;
          justify-content: center;
          align-items: stretch;
          max-width: 1200px;
          margin: 0 auto;
        }

        .trend-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          cursor: pointer;
          background: #fff;
        }

        .trend-card img {
          width: 100%;
          height: 380px;
          object-fit: cover;
          display: block;
          transition: transform 0.4s ease;
        }

        .trend-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(168, 85, 247, 0.2);
        }

        .trend-card:hover img {
          transform: scale(1.05);
        }

        .trend-info {
          position: absolute;
          bottom: 0;
          width: 100%;
          background: rgba(0, 0, 0, 0.55);
          color: #fff;
          padding: 16px;
          text-align: left;
        }

        .trend-info h3 {
          margin: 0;
          font-size: 20px;
          font-weight: 700;
        }

        .trend-info p {
          margin: 4px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }

        .ai-features {
          background: white;
          padding: 100px 40px;
        }

        .features-container {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .features-title {
          font-size: 48px;
          color: #1e1b4b;
          margin-bottom: 16px;
          font-weight: 700;
          letter-spacing: -1px;
        }

        .features-subtitle {
          font-size: 18px;
          color: #64748b;
          margin-bottom: 60px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
          gap: 32px;
        }

        .feature-card {
          background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
          padding: 40px 32px;
          border-radius: 24px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #a855f7, #ec4899, #f97316);
          transform: scaleX(0);
          transition: transform 0.4s ease;
        }

        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 48px rgba(168, 85, 247, 0.15);
          border-color: #e9d5ff;
        }

        .feature-card:hover::before {
          transform: scaleX(1);
        }

        .feature-icon {
          font-size: 56px;
          margin-bottom: 24px;
          transition: transform 0.4s ease;
        }

        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }

        .feature-title {
          font-size: 22px;
          color: #1e1b4b;
          margin-bottom: 16px;
          font-weight: 600;
        }

        .feature-desc {
          color: #64748b;
          line-height: 1.7;
          font-size: 15px;
        }

        .sponsors {
          background: linear-gradient(180deg, #faf5ff 0%, #ffffff 100%);
          padding: 80px 40px;
        }

        .sponsors-title {
          text-align: center;
          font-size: 32px;
          color: #1e1b4b;
          margin-bottom: 48px;
          font-weight: 700;
        }

        .sponsors-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .sponsor-card {
          background: white;
          padding: 32px;
          border-radius: 20px;
          text-align: center;
          border: 1px solid #e2e8f0;
          transition: all 0.3s ease;
        }

        .sponsor-card:hover {
          box-shadow: 0 12px 32px rgba(168, 85, 247, 0.12);
          transform: translateY(-4px);
          border-color: #e9d5ff;
        }

        .sponsor-type {
          font-size: 11px;
          background: linear-gradient(135deg, #a855f7, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          margin-bottom: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .sponsor-brand {
          font-size: 28px;
          font-weight: 700;
          color: #1e1b4b;
          margin-bottom: 8px;
        }

        .sponsor-tagline {
          font-size: 13px;
          color: #64748b;
          margin-top: 8px;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 48px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .cta-buttons {
            flex-direction: column;
            width: 100%;
          }

          .cta-button {
            width: 100%;
          }

          .trends-title {
            font-size: 32px;
          }

          .trend-card img {
            height: 300px;
          }

          .features-title {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="promo-banner">
        Limited Offer: ₹500 OFF on Your First AI Styling Session
      </div>

      {/* Hero Section */}
      <section className="festival-section">
        <div className="festival-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨</span> AI-Powered Fashion Intelligence
            </div>
            <h1 className="hero-title">Your Personal Style, Perfected</h1>
            <p className="hero-subtitle">
              Experience the future of fashion with AI-driven recommendations tailored to your unique style, body type, and preferences.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number">90%</div>
                <div className="stat-label">Accuracy Rate</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">2M+</div>
                <div className="stat-label">Happy Users</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Styles Curated</div>
              </div>
            </div>

            <div className="cta-buttons">
              <button className="cta-button" onClick={handleStyleMe} disabled={isLoading}>
                {isLoading ? '✨ Analyzing...' : '✨ Start Your Style Journey'}
              </button>
              <button 
               onClick={() => navigate("/collection")}
              className="cta-button cta-button-secondary">
                Explore Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop Trends Section */}
      <section className="shop-trends">
        <h2 className="trends-title">Shop the Latest Trends</h2>
        <div className="trends-grid">
          
          <div className="trend-card">
            <img src="https://i.pinimg.com/736x/7d/e2/a8/7de2a805d1465fb122ec158a8cbfa60b.jpg" alt="Trends" />
            <div className="trend-info">
              <h3>Trends</h3>
              <p>Under ₹399</p>
            </div>
          </div>

          <div className="trend-card">
            <img src="https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=800&fit=crop" alt="Yousta under 499" />
            <div className="trend-info">
              <h3>Yousta</h3>
              <p>Under ₹499</p>
            </div>
          </div>

          <div className="trend-card">
            <img src="https://i.pinimg.com/736x/79/dc/ff/79dcffd505d4503942c7437e9af36679.jpg" alt="Kurta & Kurti Sets" />
            <div className="trend-info">
              <h3>Kurta & Kurti Sets</h3>
              <p>Under ₹599</p>
            </div>
          </div>

          <div className="trend-card">
            <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=600&h=800&fit=crop" alt="Azorte Sale" />
            <div className="trend-info">
              <h3>AZORTE</h3>
              <p>Min. 70% Off</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="ai-features">
        <div className="features-container">
          <h2 className="features-title">Intelligent Fashion Technology</h2>
          <p className="features-subtitle">
            Powered by advanced AI to bring you personalized style experiences
          </p>

          <div className="features-grid">
            <div className="feature-card" onClick={() => handleFeatureClick('style-analysis')}>
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Smart Style Analysis</h3>
              <p className="feature-desc">
                Our AI analyzes your style preferences and lifestyle to create personalized fashion suggestions tailored just for you.
              </p>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('visual-search')}>
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Visual Style Discovery</h3>
              <p className="feature-desc">
                Upload a photo or outfit inspiration, and let our AI instantly find similar looks from thousands of global brands.
              </p>
            </div>

            <div className="feature-card" onClick={() => handleFeatureClick('trend-predictions')}>
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Body Forecasting</h3>
              <p className="feature-desc">
                Stay ahead of the fashion curve with AI-driven insights on emerging global trends, colors, and designs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="sponsors">
        <h2 className="sponsors-title">Trusted Partners</h2>
        <div className="sponsors-container">
          <div className="sponsor-card">
            <div className="sponsor-type">AI Technology</div>
            <div className="sponsor-brand">StyleAI</div>
            <div className="sponsor-tagline">Powering Smart Fashion</div>
          </div>
          <div className="sponsor-card">
            <div className="sponsor-type">Fashion Network</div>
            <div className="sponsor-brand">TrendCorp</div>
            <div className="sponsor-tagline">Global Style Leaders</div>
          </div>
          <div className="sponsor-card">
            <div className="sponsor-type">Innovation Partner</div>
            <div className="sponsor-brand">FashTech</div>
            <div className="sponsor-tagline">Future of Fashion</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;