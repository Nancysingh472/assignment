# File Search & Document Management System

This project is a React-based document search and management application developed as part of a frontend assignment.  
It provides an interface to search, preview, and download documents stored on AWS S3 using secure APIs.

The focus of this project is clean UI, proper state handling, responsive design, and structured Git workflow.

---

## Project Overview

The application allows users to filter and search documents using multiple criteria such as category, tags, and date range.  
Users can preview supported file types directly in the browser and download files individually or in bulk.

This assignment demonstrates:

- Frontend development skills using React
- Application state management
- Responsive UI design
- API integration
- Proper usage of Git and version control best practices

---

## Features

- Search documents using:
  - Major Head
  - Minor Head
  - Tags (with auto-suggestions)
  - Date range
- Preview supported files:
  - PDF files
  - Images (JPG, PNG, WEBP)
- Download single documents
- Download multiple documents as a ZIP
- Responsive UI using Bootstrap
- Graceful handling of unsupported file types

---

## State Management

- React Hooks (`useState`, `useEffect`) are used for managing component and application state
- API calls are abstracted into service files
- UI state such as filters, search results, and preview modal is handled cleanly within components

This approach keeps the code readable, modular, and easy to maintain.

---

## Responsive Design

- Bootstrap is used for layout and styling
- The application is responsive and works across different screen sizes
- Tables, modals, and forms adapt well to smaller devices

A simple and clean UI has been used as per assignment guidelines.

---

## Project Structure

src/
├── pages/
│ └── FileSearchPage.jsx
├── services/
│ └── fileService.js
├── App.js
└── index.js

- `pages` contain UI components
- `services` handle API interactions
- Clear separation between UI and data logic

---

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Steps to Run the Application

```bash
npm install
npm start

```
