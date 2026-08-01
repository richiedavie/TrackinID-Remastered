import './Features.css'; // Reusing feature styles

export default function Benefits() {
  const benefits = [
    {
      title: "Improved Safety",
      description: "Real-time location and driver condition visibility, with alerts for emergencies.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      )
    },
    {
      title: "Higher Productivity",
      description: "Optimal routes and disciplined driving lead to faster, more fuel-efficient trips.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      )
    },
    {
      title: "Full Control",
      description: "A single dashboard view replaces manual, one-by-one vehicle checks.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      )
    },
    {
      title: "Transparency",
      description: "Every vehicle and driver is logged automatically; no manual data manipulation.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    }
  ];

  return (
    <section className="section-padding">
      <div className="container">
        <div className="features-header text-center">
          <h2>Platform Benefits</h2>
          <p>Why logistics leaders choose Trackin.ID.</p>
        </div>
        
        <div className="grid grid-cols-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="card feature-card">
              <div className="feature-icon">
                {benefit.icon}
              </div>
              <h4 className="feature-title">{benefit.title}</h4>
              <p className="feature-description">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
