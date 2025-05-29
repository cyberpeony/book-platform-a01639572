import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../config/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        bio: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!user) return;
        const fetchProfile = async () => {
            try {
                const ref = doc(db, 'users', user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    const data = snap.data();
                    setProfile({
                        firstName: data.firstName || '',
                        lastName: data.lastName || '',
                        email: data.email || '',
                        bio: data.bio || ''
                    });
                } else {
                    setError('User data not found.');
                }
            } catch (err: any) {
                setError('Failed to fetch profile data.');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        if (!user) return;
        try {
            await updateDoc(doc(db, 'users', user.uid), {
                firstName: profile.firstName,
                lastName: profile.lastName,
                bio: profile.bio
            });
            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError('Failed to save profile data.');
        }
    };

    if (loading || !user) return <p className="container">Loading profile...</p>;

    return (
        <div className="container profile-page">
            <h1>Your Profile</h1>

            <div className="profile-card">
                <h2>{profile.firstName} {profile.lastName}</h2>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Bio:</strong> {profile.bio || 'No bio added yet.'}</p>
            </div>

            <h3>Edit Profile</h3>
            {error && <p className="error-message">{error}</p>}
            {success && <p style={{ color: 'green' }}>Profile updated successfully!</p>}

            <div className="auth-form">
                <input
                    type="text"
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                />
                <input
                    type="text"
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                />
                <input
                    type="email"
                    name="email"
                    value={profile.email}
                    disabled
                />
                <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    placeholder="Short Bio"
                    rows={4}
                />
                <button onClick={handleSave}>Save Changes</button>
            </div>
        </div>
    );
};

export default Profile;
