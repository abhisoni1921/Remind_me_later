import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ReminderForm = ({ onSubmit }) => {
  const [reminderDate, setReminderDate] = useState(new Date());
  const [message, setMessage] = useState('');
  const [reminderMethod, setReminderMethod] = useState('SMS');
  const [contactInfo, setContactInfo] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (!contactInfo.trim()) {
      newErrors.contactInfo = 'Contact information is required';
    } else if (reminderMethod === 'Email' && !isValidEmail(contactInfo)) {
      newErrors.contactInfo = 'Please enter a valid email address';
    } else if (reminderMethod === 'SMS' && !isValidPhone(contactInfo)) {
      newErrors.contactInfo = 'Please enter a valid phone number';
    }
    
    if (reminderDate < new Date()) {
      newErrors.date = 'Reminder date must be in the future';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };
  
  const isValidPhone = (phone) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Format date and time for API
    const date = reminderDate.toISOString().split('T')[0];
    const time = `${reminderDate.getHours().toString().padStart(2, '0')}:${reminderDate.getMinutes().toString().padStart(2, '0')}`;
    
    onSubmit({
      date,
      time,
      message,
      reminderMethod,
      contactInfo
    });
    
    // Reset form
    setReminderDate(new Date());
    setMessage('');
    setContactInfo('');
  };
  
  const handleMethodChange = (e) => {
    setReminderMethod(e.target.value);
    setContactInfo(''); // Clear contact info when method changes
    setErrors({...errors, contactInfo: undefined});
  };

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="date">Date & Time</label>
        <DatePicker
          id="date"
          selected={reminderDate}
          onChange={(date) => setReminderDate(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
          className={`form-control ${errors.date ? 'error' : ''}`}
        />
        {errors.date && <div className="error-message">{errors.date}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="message">Reminder Message</label>
        <textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your reminder message"
          className={`form-control ${errors.message ? 'error' : ''}`}
          rows="3"
        />
        {errors.message && <div className="error-message">{errors.message}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="method">Reminder Method</label>
        <select
          id="method"
          value={reminderMethod}
          onChange={handleMethodChange}
          className="form-control"
        >
          <option value="SMS">SMS</option>
          <option value="Email">Email</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="contactInfo">
          {reminderMethod === 'SMS' ? 'Phone Number' : 'Email Address'}
        </label>
        <input
          id="contactInfo"
          type={reminderMethod === 'SMS' ? 'tel' : 'email'}
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          placeholder={reminderMethod === 'SMS' ? 'Enter phone number (e.g. +12345678901)' : 'Enter email address'}
          className={`form-control ${errors.contactInfo ? 'error' : ''}`}
        />
        {errors.contactInfo && <div className="error-message">{errors.contactInfo}</div>}
      </div>
      
      <button type="submit" className="btn-primary">Create Reminder</button>
    </form>
  );
};

export default ReminderForm;