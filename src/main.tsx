import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { SavedItemsProvider } from './context/SavedItemsContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <SavedItemsProvider>
                    <App />
                </SavedItemsProvider>
            </AuthProvider>
        </BrowserRouter>
    </React.StrictMode>
);
