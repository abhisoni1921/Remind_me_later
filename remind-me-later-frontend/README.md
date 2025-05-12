# Remind-me-later React Frontend

This is the React frontend for the "Remind-me-later" application that allows users to set up reminders with customized messages to be delivered via SMS or Email.

## Features

- Create new reminders with date, time, message, and delivery method
- View all your scheduled reminders in a clean interface
- Edit existing reminders
- Delete reminders you no longer need
- Form validation to ensure all data is entered correctly
- Responsive design that works on desktop and mobile

## Prerequisites

- Node.js (v14 or later)
- The Remind-me-later backend API running

## Setup Instructions

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory with:

```
REACT_APP_API_URL=http://localhost:3000/api
```

Note: Adjust the URL to match wherever your backend API is running

4. Start the development server

```bash
npm start
```

The app will be available at http://localhost:3001

## Building for Production

To create a production build:

```bash
npm run build
```

This will create a `build` directory with optimized production files.

## Project Structure

```
src/
├── components/     # UI components
│   ├── Header.js
│   ├── Footer.js
│   ├── ReminderForm.js
│   ├── ReminderList.js
│   ├── ReminderItem.js
│   └── EditReminderModal.js
├── services/       # API services
│   └── api.js
├── App.js          # Main application component
├── index.js        # Entry point
├── App.css         # Main styles
└── index.css       # Global styles
```

## Technologies Used

- React.js - Frontend framework
- react-datepicker - Date and time selection
- react-icons - Icon components
- react-toastify - Toast notifications
- axios - API requests

## Extending the Application

### Adding a New Reminder Method

To add a new reminder method (beyond SMS and Email):

1. Add the new method to the select options in `ReminderForm.js` and `EditReminderModal.js`
2. Update validation logic in both components for the new method
3. Add a new method icon in `ReminderItem.js`

### Customizing UI

- Main styling is in `App.css`
- Colors and variables are defined at the top of `App.css` using CSS custom properties

### Adding New Features

Potential features to add:
- User authentication
- Reminder categories/tags
- Recurring reminders
- Dark mode theme