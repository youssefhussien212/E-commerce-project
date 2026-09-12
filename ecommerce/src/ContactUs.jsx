import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 6000); 
  };

  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <p>We're here to help you with any questions or concerns you may have. Whether you need assistance with your order, have questions about our products, or need more information about our policies, we're always ready to assist you.</p>
      <h2>Contact Form:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <br />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
        <br />
        <button type="submit">Submit</button>
      </form>
      {showSuccess && (
        <div className="success-message" style={{ color: 'green', marginTop: '20px' }}>
          Your message has been sent successfully!
        </div>
      )}
    </div>
  );
};

export default ContactUs;
