const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/remind-me-later', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Reminder Schema
const reminderSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  }, 
  reminderMethod: {
    type: String,
    enum: ['SMS', 'Email'],
    required: true
  },
  contactInfo: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

// Routes
app.post('/api/reminders', async (req, res) => {
  try {
    const { date, time, message, reminderMethod, contactInfo } = req.body;
    
    // Validate required fields
    if (!date || !time || !message || !reminderMethod || !contactInfo) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields. Please provide date, time, message, reminderMethod, and contactInfo.' 
      });
    }
    
    // Validate reminder method
    if (!['SMS', 'Email'].includes(reminderMethod)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid reminder method. Supported methods are SMS and Email.'
      });
    }
    
    // Create a proper date object by combining the date and time
    const [year, month, day] = date.split('-').map(Number);
    const [hours, minutes] = time.split(':').map(Number);
    
    const reminderDate = new Date(year, month - 1, day, hours, minutes);
    
    // Validate that the reminder date is in the future
    if (reminderDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Reminder date must be in the future.'
      });
    }
    
    // Create a new reminder
    const newReminder = new Reminder({
      date: reminderDate,
      message,
      reminderMethod,
      contactInfo
    });
    
    // Save to database
    await newReminder.save();
    
    res.status(201).json({
      success: true,
      message: 'Reminder created successfully',
      data: {
        id: newReminder._id,
        date: newReminder.date,
        message: newReminder.message,
        reminderMethod: newReminder.reminderMethod,
        status: newReminder.status
      }
    });
  } catch (error) {
    console.error('Error creating reminder:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create reminder',
      error: error.message
    });
  }
});

// Get all reminders (helpful for testing)
app.get('/api/reminders', async (req, res) => {
  try {
    const reminders = await Reminder.find({}).sort({ date: 1 });
    res.status(200).json({
      success: true,
      count: reminders.length,
      data: reminders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reminders',
      error: error.message
    });
  }
});

// Get a specific reminder
app.get('/api/reminders/:id', async (req, res) => {
  try {
    const reminder = await Reminder.findById(req.params.id);
    
    if (!reminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: reminder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve reminder',
      error: error.message
    });
  }
});

// Update a reminder
app.put('/api/reminders/:id', async (req, res) => {
  try {
    const { date, time, message, reminderMethod, contactInfo } = req.body;
    
    let updateData = {};
    
    if (date && time) {
      const [year, month, day] = date.split('-').map(Number);
      const [hours, minutes] = time.split(':').map(Number);
      updateData.date = new Date(year, month - 1, day, hours, minutes);
    } else if (date) {
      const currentReminder = await Reminder.findById(req.params.id);
      const currentDate = new Date(currentReminder.date);
      const [year, month, day] = date.split('-').map(Number);
      updateData.date = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes());
    } else if (time) {
      const currentReminder = await Reminder.findById(req.params.id);
      const currentDate = new Date(currentReminder.date);
      const [hours, minutes] = time.split(':').map(Number);
      updateData.date = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), hours, minutes);
    }
    
    if (message) updateData.message = message;
    if (reminderMethod) updateData.reminderMethod = reminderMethod;
    if (contactInfo) updateData.contactInfo = contactInfo;
    
    const updatedReminder = await Reminder.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedReminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Reminder updated successfully',
      data: updatedReminder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update reminder',
      error: error.message
    });
  }
});

// Delete a reminder
app.delete('/api/reminders/:id', async (req, res) => {
  try {
    const deletedReminder = await Reminder.findByIdAndDelete(req.params.id);
    
    if (!deletedReminder) {
      return res.status(404).json({
        success: false,
        message: 'Reminder not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Reminder deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete reminder',
      error: error.message
    });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;