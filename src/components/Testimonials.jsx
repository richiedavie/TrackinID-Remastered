import './Testimonials.css';

export default function Testimonials() {
  const testimonials = [
    {
      quote: "Trackin.ID helps us monitor more than 150 logistics vehicles on a single platform. The fleet dashboard and smart alert features have significantly improved operational efficiency — fuel costs are down 20% and on-time deliveries are up.",
      author: "Operations Director",
      company: "Nusantara Logistics"
    },
    {
      quote: "We used to struggle tracking the location and condition of our rental fleet. Now everything is tracked in real time and service schedules stay under control.",
      author: "CEO",
      company: "MetroRent Car Services"
    }
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-alternate)' }}>
      <div className="container">
        <div className="grid grid-cols-2">
          {testimonials.map((test, idx) => (
            <div key={idx} className="testimonial-block">
              <p className="testimonial-quote">"{test.quote}"</p>
              <div className="testimonial-author">
                <strong>{test.author}</strong>
                <span>, {test.company}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
