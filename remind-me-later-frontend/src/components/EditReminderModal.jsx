import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiX } from 'react-icons/fi';

const EditReminderModal = ({ reminder, onUpdate, onClose }) => {
  const [reminderDate, setReminderDate] = useState(new Date(reminder.date));
  const [message, setMessage] = useState(reminder.message);
  const [reminderMethod, setReminderMethod] = useState(reminder.reminderMethod);
  const [contactInfo, setContactInfo] = useState(reminder.contactInfo);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Add class to body to prevent scrolling while modal is open
    document.body.classList.add('modal-open');
    
    // Handle escape key press
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    // Cleanup
    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

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
    
    onUpdate({
      date,
      time,
      message,
      reminderMethod,
      contactInfo
    });
  };
  
  const handleMethodChange = (e) => {
    const newMethod = e.target.value;
    setReminderMethod(newMethod);
    
    // Clear contact info if method changes
    if (newMethod !== reminderMethod) {
      setContactInfo('');
      setErrors({...errors, contactInfo: undefined});
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Reminder</h2>
          <button className="close-btn" onClick={onClose}>
            <FiX size={24} />
          </button>
        </div>
        
        <div className="modal-body">
          <form className="reminder-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="edit-date">Date & Time</label>
              <DatePicker
                id="edit-date"
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
              <label htmlFor="edit-message">Reminder Message</label>
              <textarea
                id="edit-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your reminder message"
                className={`form-control ${errors.message ? 'error' : ''}`}
                rows="3"
              />
              {errors.message && <div className="error-message">{errors.message}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-method">Reminder Method</label>
              <select
                id="edit-method"
                value={reminderMethod}
                onChange={handleMethodChange}
                className="form-control"
              >
                <option value="SMS">SMS</option>
                <option value="Email">Email</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="edit-contactInfo">
                {reminderMethod === 'SMS' ? 'Phone Number' : 'Email Address'}
              </label>
              <input
                id="edit-contactInfo"
                type={reminderMethod === 'SMS' ? 'tel' : 'email'}
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder={reminderMethod === 'SMS' ? 'Enter phone number (e.g. +12345678901)' : 'Enter email address'}
                className={`form-control ${errors.contactInfo ? 'error' : ''}`}
              />
              {errors.contactInfo && <div className="error-message">{errors.contactInfo}</div>}
            </div>
            
            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Update Reminder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditReminderModal;