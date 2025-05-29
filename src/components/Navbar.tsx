import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        const confirmLogout = window.confirm("Do you want to log out?");
        if (confirmLogout) {
            logout();
        }
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-link">📚</Link>
            <Link to="/search" className="nav-link">Search</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            <Link to="/profile" className="nav-link">Profile</Link>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
                {user ? (
                    <>
                        <span className="nav-link">Hi, {user.email?.split('@')[0]}</span>
                        <button onClick={handleLogout} className="nav-button">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/register" className="nav-link">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
