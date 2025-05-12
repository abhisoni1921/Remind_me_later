import React from 'react';
import { FiEdit2, FiTrash2, FiMail, FiMessageSquare } from 'react-icons/fi';

const ReminderItem = ({ reminder, onEdit, onDelete }) => {
  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'sent':
        return 'status-sent';
      case 'failed':
        return 'status-failed';
      default:
        return 'status-pending';
    }
  };

  // Get reminder method icon
  const getReminderMethodIcon = (method) => {
    switch (method) {
      case 'Email':
        return <FiMail className="method-icon" />;
      case 'SMS':
        return <FiMessageSquare className="method-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="reminder-item">
      <div className="reminder-header">
        <div className="reminder-date">{formatDate(reminder.date)}</div>
        <div className={`reminder-status ${getStatusClass(reminder.status)}`}>
          {reminder.status}
        </div>
      </div>
      
      <div className="reminder-body">
        <p className="reminder-message">{reminder.message}</p>
      </div>
      
      <div className="reminder-footer">
        <div className="reminder-method">
          {getReminderMethodIcon(reminder.reminderMethod)}
          <span>{reminder.reminderMethod}: {reminder.contactInfo}</span>
        </div>
        
        <div className="reminder-actions">
          <button 
            className="btn-icon" 
            onClick={onEdit} 
            aria-label="Edit reminder"
          >
            <FiEdit2 />
          </button>
          <button 
            className="btn-icon delete" 
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this reminder?')) {
                onDelete();
              }
            }}
            aria-label="Delete reminder"
          >
            <FiTrash2 />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReminderItem;