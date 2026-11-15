# EduLearn LMS – Frontend

## Description

EduLearn LMS is a React application connected to the LMS Backend API.

The application provides role-based interfaces for administrators and learners.

## Technologies

- React
- Vite
- JavaScript
- CSS
- Fetch API

## Requirements

- Node.js
- npm
- LMS Backend running locally

## Installation

Clone the repository, then install the dependencies:

```bash
npm install
```

## Environment configuration

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

Change the URL if your backend uses a different address.

## Run the application

```bash
npm run dev
```

## Build for production

```bash
npm run build
```

## Main features

### Authentication
- Login using the backend API.
- Retrieve the authenticated user's profile.
- Keep the session in React state.
- Handle unauthorized and forbidden responses.

### Administrator
- View the dashboard.
- View the course catalog.
- Create and update courses.
- Publish, unpublish, and archive courses.

### Learner
- View the learner dashboard.
- View personal profile information.
- View personal enrollments.

## API Integration

The frontend communicates with the backend through REST API endpoints.

The API base URL is configured using `VITE_API_URL`.

Authentication uses JWT tokens sent through the Authorization header.

## Notes

- User management is not implemented because the current backend does not provide the required API endpoints.
- The application uses React state for session management.
