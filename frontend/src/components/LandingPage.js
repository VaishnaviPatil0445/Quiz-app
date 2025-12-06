import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center fade-in">
              <h1 className="display-3 fw-bold mb-4">Test Your Knowledge with QuizMaster</h1>
              <p className="lead mb-5">Challenge yourself with our interactive quizzes on various topics including DSA, Java, Python and more!</p>
              <div className="d-flex gap-3 justify-content-center flex-wrap">
                <Link to="/quiz" className="btn btn-primary btn-lg">
                  <i className="fas fa-play-circle me-2"></i>Start Quiz
                </Link>
                <Link to="/signup" className="btn btn-secondary btn-lg">
                  <i className="fas fa-user-plus me-2"></i>Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose QuizMaster?</h2>
            <p className="text-muted">Discover the features that make our quiz platform stand out</p>
          </div>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card feature-card h-100 fade-in">
                <div className="card-body text-center p-4">
                  <div className="feature-icon">
                    <i className="fas fa-layer-group"></i>
                  </div>
                  <h5 className="card-title">Multiple Categories</h5>
                  <p className="card-text">Test your knowledge in various subjects like DSA, Java, Python and more.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card h-100 fade-in">
                <div className="card-body text-center p-4">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <h5 className="card-title">Track Your Progress</h5>
                  <p className="card-text">See your scores improve as you take more quizzes and learn new concepts.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card feature-card h-100 fade-in">
                <div className="card-body text-center p-4">
                  <div className="feature-icon">
                    <i className="fas fa-cogs"></i>
                  </div>
                  <h5 className="card-title">Admin Features</h5>
                  <p className="card-text">Admins can add new questions and manage the quiz content easily.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <h3 className="fw-bold">Ready to challenge yourself?</h3>
              <p className="text-muted">Join thousands of users who are improving their knowledge with our quizzes.</p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <Link to="/signup" className="btn btn-primary btn-lg">
                <i className="fas fa-rocket me-2"></i>Get Started Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;