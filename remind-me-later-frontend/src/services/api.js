import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Get all reminders
export const getAllReminders = async () => {
  return await apiClient.get('/reminders');
};

// Get a specific reminder
export const getReminder = async (id) => {
  return await apiClient.get(`/reminders/${id}`);
};

// Create a new reminder
export const createReminder = async (reminderData) => {
  return await apiClient.post('/reminders', reminderData);
};

// Update a reminder
export const updateReminder = async (id, reminderData) => {
  return await apiClient.put(`/reminders/${id}`, reminderData);
};

// Delete a reminder
export const deleteReminder = async (id) => {
  return await apiClient.delete(`/reminders/${id}`);
};

export default apiClient;