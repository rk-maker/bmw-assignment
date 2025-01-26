import React from "react";
import "./Contact.css";
import CustomButon from "../../components/Button/Button";
const Contact = () => {
  return (
    <div className="contact-section">
      <div className="contact-content">
        <h1>Contact Me</h1>
        <p>
          Feel free to reach out for collaboration, queries, or just to say hi!
          I'm always open to exciting opportunities.
        </p>
        <form className="contact-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Your Message" rows="5" required></textarea>
          <CustomButon>Send Message</CustomButon>
        </form>
      </div>
    </div>
  );
};

export default Contact;
