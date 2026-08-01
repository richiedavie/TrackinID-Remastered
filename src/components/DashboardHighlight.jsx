import './DashboardHighlight.css';

export default function DashboardHighlight() {
  return (
    <section className="section-padding dashboard-highlight">
      <div className="container">
        <div className="highlight-content">
          <div className="highlight-image-wrapper">
            {/* TODO: replace with dashboard screenshot */}
            <div className="highlight-mockup-placeholder" style={{ padding: 0, overflow: 'hidden' }}>
              <img 
                src="/dashboard-trucks.png" 
                alt="Trackin.ID Fleet Tracking" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
          
          <div className="highlight-text">
            <h2>Complete Dashboard, Everything in One Place.</h2>
            <p>
              Trackin.ID provides an all-in-one dashboard so users don't need to juggle multiple apps or manual reports. Everything a vehicle owner or company needs is accessible from a single, modern interface.
            </p>
            <div className="highlight-actions">
              <a href="#" className="btn btn-outline">View Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
