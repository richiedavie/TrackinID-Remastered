import './Hero.css';

export default function Hero() {
  return (
    <section id="home" className="hero section-padding">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              One System, Thousands of Vehicles Controlled.
            </h1>
            <p className="hero-description">
              Trackin.ID is an advanced technology solution designed to help you manage every aspect of your vehicle operations — efficiently and in real time.
            </p>
            <div className="hero-actions">
              <a href="#" className="btn btn-primary">Start Now</a>
              <a href="#" className="btn btn-outline">See the Preview</a>
            </div>
          </div>
          
          <div className="hero-image-wrapper">
            {/* TODO: replace with dashboard screenshot */}
            <div className="hero-mockup-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
              <img 
                src="/hero-truck.png" 
                alt="Trackin.ID Fleet Management" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
