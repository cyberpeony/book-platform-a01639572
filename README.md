# 📚 Book Platform

This is the book platform project for the Advanced Web module in the Development and Deployment of Software Systems course. Built using **React + TypeScript + Vite**. It also uses **Firebase** for the backend and the **Google Books API** to fetch the book catalog and perform searches.

---

##  Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/cyperpeony/book-platform-a01639572.git
cd book-platform-a01639572
```

### 2. Install dependencies

Using Yarn:

```bash
yarn
```

Or using npm:

```bash
npm install
```

### 3. Run it

```bash
yarn dev
```

The app will be at: [http://localhost:5173](http://localhost:5173)

---

## Env Variables

Before running, create a `.env` in the root of the project with:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

VITE_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

These variables are required to connect to Firebase and the Google Books API.  
The `.env` file is already in the `.gitignore` to prevent exposing keys in the repo.

---

##  Author

- GitHub: [@cyberpeony](https://github.com/cyberpeony)
