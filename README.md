# 📚 Book Platform

This is the book platform project for the Advanced Web module in the Development and Deployment of Software Systems course. Built using **React + TypeScript + Vite**. Uses also **Firebase** for the backend and **Google Books API** as a service to fetch all of the book catalog and searches.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/cyperpeony/book-platform-a01639572.git
cd book-platform-a01639572

### 2. Install dependencies

Using Yarn:
- yarn
Or npm:
- npm install

## 3. Run the development server

yarn dev

The app will be at http://localhost:5173

# Env

Before running the app, create a .env file in the root of the project with:

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key

These variables are required to connect to Firebase and the Google Books API. It's already included in .gitignore to not risk sensitive keys in the Git.
