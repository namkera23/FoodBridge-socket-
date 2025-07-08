import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

const Homepage = () => {
  const navigate = useNavigate();
  const [showVideo, setShowVideo] = useState(false); // Toggle between image & video
  const [activeCard, setActiveCard] = useState(null); // Track which mini-card is open

  // Function to toggle mini-cards
  const handleCardClick = (cardName) => {
    setActiveCard(activeCard === cardName ? null : cardName); // toggle card open/close
  };

  return (
    <div className="homepageh">
      {/* Header */}
      <header className="headerh">
        <div className="logo1h">
          <h1 className="title">foodbridge</h1>
        </div>
        <div className="button-containerh">
          {/* Buttons with hover-preview and click-action */}
          <button
            className="button1h"
            onClick={() => handleCardClick('who')}
            data-preview="Learn about our mission and team"
          >
            Who We Are
          </button>
          <button
            className="button2h"
            onClick={() => handleCardClick('what')}
            data-preview="Discover how we work"
          >
            What Do We Do
          </button>
          <button
            className="button2h"
            onClick={() => handleCardClick('get')}
            data-preview="See how you can help"
          >
            Get Involved
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`hero ${showVideo ? 'video-active' : ''}`}>
        {!showVideo ? (
          <>
            <div className="headsiediv">
              <h1 className="headsieh">"Rescue Surplus Food & Feed Those in Need"</h1>
            </div>
            {/* Arrow Button */}
            <div className="arrow" onClick={() => setShowVideo(true)}>&#10145;</div>
          </>
        ) : (
          <video autoPlay loop muted className="hero-video">
            <source src="/videos/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </section>

      {/* Mini Cards */}
      {activeCard === 'who' && (
        <div className="mini-card">
          <h3>Who We Are</h3>
          <p>We are a dedicated team working to rescue surplus food and deliver it to people in need.</p>
          <button className="close-btn" onClick={() => setActiveCard(null)}>Close</button>
        </div>
      )}
      {activeCard === 'what' && (
        <div className="mini-card">
          <h3>What Do We Do</h3>
          <p>We connect donors, volunteers, and NGOs to reduce food waste and make a positive impact.</p>
          <button className="close-btn" onClick={() => setActiveCard(null)}>Close</button>
        </div>
      )}
      {activeCard === 'get' && (
        <div className="mini-card">
          <h3>Get Involved</h3>
          <p>You can donate food, volunteer for deliveries, or help us grow the network.</p>
          <button className="close-btn" onClick={() => setActiveCard(null)}>Close</button>
        </div>
      )}

      {/* Features */}
      <section className="featuresh" id="features">
        <h2 className="fe">Features</h2>
        <div className="feature-itemh">
          <img src="/images/pic5.jpg" alt="Food Banks/NGOs" className="feature-img" />
          <h4 className="title">Food Banks/NGOs</h4>
          <p className="info">Receive donation requests, verify quality, and distribute food to the needy.</p>
        </div>
        <div className="feature-itemh">
          <img src="/images/pic3.png" alt="Restaurants/Hotels" className="feature-img" />
          <h4 className="title">Restaurants/Hotels</h4>
          <p className="info">List surplus food and notify nearby food banks for donation.</p>
        </div>
        <div className="feature-itemh">
          <img src="/images/vol.jpg" alt="Volunteers" className="feature-img" />
          <h4 className="title">Volunteers</h4>
          <p className="info">Help with transportation, coordination, and ensuring food reaches beneficiaries.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footerh">
        <p>Want to contact our team? Call us at: <strong>7039757699</strong></p>
        <p>Email: <a href="mailto:foodbridge@gmail.com">foodbridge@gmail.com</a></p>
      </footer>
    </div>
  );
};

export default Homepage;
