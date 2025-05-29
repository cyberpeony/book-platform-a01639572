import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Details from "./pages/Details.tsx";
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';

const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/dashboard" element={<div className="container"><h2>Dashboard Page</h2></div>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/book/:id" element={<Details />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

            </Routes>
        </>
    );
};

export default App;
