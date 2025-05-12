import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Footer from './components/Footer';
import ReminderForm from './components/ReminderForm';
import ReminderList from './components/ReminderList';
import EditReminderModal from './components/EditReminderModal';
import { getAllReminders, createReminder, updateReminder, deleteReminder } from './services/api';
import './App.css';

function App() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReminder, setEditingReminder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      setLoading(true);
      const response = await getAllReminders();
      if (response.data.success) {
        setReminders(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch reminders');
      console.error('Error fetching reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReminder = async (reminderData) => {
    try {
      const response = await createReminder(reminderData);
      if (response.data.success) {
        toast.success('Reminder added successfully!');
        fetchReminders();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add reminder');
      console.error('Error adding reminder:', error);
    }
  };

  const handleEditReminder = (reminder) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const handleUpdateReminder = async (id, reminderData) => {
    try {
      const response = await updateReminder(id, reminderData);
      if (response.data.success) {
        toast.success('Reminder updated successfully!');
        fetchReminders();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update reminder');
      console.error('Error updating reminder:', error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      const response = await deleteReminder(id);
      if (response.data.success) {
        toast.success('Reminder deleted successfully!');
        fetchReminders();
      }
    } catch (error) {
      toast.error('Failed to delete reminder');
      console.error('Error deleting reminder:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReminder(null);
  };

  return (
    <div className="app">
      <Header />
      <main className="container">
        <section className="form-section">
          <h2>Create a New Reminder</h2>
          <ReminderForm onSubmit={handleAddReminder} />
        </section>
        
        <section className="reminders-section">
          <h2>Your Reminders</h2>
          {loading ? (
            <div className="loading">Loading reminders...</div>
          ) : (
            <ReminderList 
              reminders={reminders} 
              onEdit={handleEditReminder} 
              onDelete={handleDeleteReminder} 
            />
          )}
        </section>
      </main>
      
      {isModalOpen && (
        <EditReminderModal 
          reminder={editingReminder}
          onUpdate={(data) => handleUpdateReminder(editingReminder._id, data)}
          onClose={closeModal}
        />
      )}
      
      <Footer />
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;