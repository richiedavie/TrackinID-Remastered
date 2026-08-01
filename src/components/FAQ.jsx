import { useState } from 'react';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are the main benefits of using Trackin.ID?",
      answer: "Helps owners/companies save on operating costs, maintain fleet security, and stay on top of maintenance via one real-time dashboard."
    },
    {
      question: "Can Trackin.ID help reduce fuel costs?",
      answer: "Yes, via Fuel & Consumption Analysis and Driver Behavior Monitoring, which surface the most efficient driving patterns."
    },
    {
      question: "Is Trackin.ID suitable for companies with large fleets?",
      answer: "Yes — Fleet Dashboard and Multi-user Access support dozens to hundreds of vehicles, with geofencing, smart alerts, and monthly reports."
    }
  ];

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: 'var(--bg-alternate)' }}>
      <div className="container">
        <div className="features-header text-center">
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about Trackin.ID.</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, idx) => (
            <div key={idx} className="faq-item">
              <button 
                className="faq-question" 
                onClick={() => toggleOpen(idx)}
                aria-expanded={openIndex === idx}
              >
                <span>{faq.question}</span>
                <svg 
                  className={`faq-icon ${openIndex === idx ? 'open' : ''}`}
                  width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              <div className={`faq-answer ${openIndex === idx ? 'open' : ''}`}>
                <div className="faq-answer-inner">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
