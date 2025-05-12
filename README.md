# Remind-me-later Application

A full-stack application that allows users to set up reminders with customized messages to be delivered via SMS or Email.

## Project Structure

This is a monorepo containing both the backend API and frontend client:


Remind-me-later/
├── remind-me-later/                   # Node.js Express API
├── remind-me-later-frontend/          # React frontend
└── README.md                          # This file


## Features

- Create reminders with date, time, message content, and delivery method
- View all scheduled reminders in a clean interface
- Edit reminder details
- Delete reminders
- Support for both SMS and Email reminders
- Form validation for all inputs
- Responsive design

## Backend Technology Stack

- *Node.js & Express*: RESTful API framework
- *MongoDB*: Database for storing reminders
- *Mongoose*: ODM for MongoDB

## Frontend Technology Stack

- *React*: Frontend framework
- *React Datepicker*: For date and time selection
- *React Icons*: For UI icons
- *React Toastify*: For toast notifications
- *Axios*: For API requests

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local installation or MongoDB Atlas)

## Setup Instructions

### Backend

1. Navigate to the backend directory:
bash
cd remind-me-later


2. Install dependencies:
bash
npm install


3. Create a .env file with the following variables:

PORT=3000
MONGODB_URI=mongodb://localhost:27017/remind-me-later


4. Start the server:
bash
npm start


### Frontend

1. Navigate to the frontend directory:
bash
cd remind-me-later-frontend


2. Install dependencies:
bash
npm install


3. Create a .env file with:

REACT_APP_API_URL=http://localhost:3000/api


4. Start the development server:
bash
npm start


## API Endpoints

| Method | Endpoint           | Description                |
|--------|-------------------|----------------------------|
| POST   | /api/reminders    | Create a new reminder      |
| GET    | /api/reminders    | Get all reminders          |
| GET    | /api/reminders/:id | Get a specific reminder   |
| PUT    | /api/reminders/:id | Update a reminder         |
| DELETE | /api/reminders/:id | Delete a reminder         |

## Design Choices

### Backend

- *Express*: Used for its simplicity and flexibility in creating RESTful APIs
- *MongoDB*: Chosen for its document structure which works well for reminder data
- *Schema Design*: Includes fields for status tracking to support future reminder delivery logic

### Frontend

- *Component Structure*: Modular components for better code organization and reuse
- *React Hooks*: Used for state management and side effects
- *Form Validation*: Client-side validation for better user experience
- *Responsive Design*: Works on both desktop and mobile devices

## Future Enhancements

- User authentication and personal reminder lists
- Actual delivery logic for sending SMS and emails
- Push notifications through web browsers
- Recurring reminders (daily, weekly, monthly)
- Categories and tags for reminders
- Search and filter functionality
- Dark/light theme toggle

## Contributors

- [Abhishek Soni] - Initial work

## License

This project is licensed under the MIT License - see the LICENSE file for details
