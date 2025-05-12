import React from 'react';
import ReminderItem from './ReminderItem';

const ReminderList = ({ reminders, onEdit, onDelete }) => {
  // Sort reminders by date (newest first)
  const sortedReminders = [...reminders].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  if (sortedReminders.length === 0) {
    return (
      <div className="no-reminders">
        <p>You don't have any reminders yet. Create one above!</p>
      </div>
    );
  }

  return (
    <div className="reminder-list">
      {sortedReminders.map((reminder) => (
        <ReminderItem
          key={reminder._id}
          reminder={reminder}
          onEdit={() => onEdit(reminder)}
          onDelete={() => onDelete(reminder._id)}
        />
      ))}
    </div>
  );
};

export default ReminderList;