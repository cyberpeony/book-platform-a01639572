import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../services/api';
import { collection, addDoc, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { AuthContext } from '../context/AuthContext';
import { useSavedItems } from '../context/SavedItemsContext';

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const { user } = useContext(AuthContext);
    const { isSaved, addItem, removeItem } = useSavedItems();

    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [reviews, setReviews] = useState<any[]>([]);

    const savedWishlist = isSaved('wishlist', id!);
    const savedQueued = isSaved('queued', id!);
    const savedRead = isSaved('read', id!);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (err) {
                setError('The book details could not be found.');
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchBook();
    }, [id]);

    useEffect(() => {
        const loadReviews = async () => {
            if (!id) return;
            const q = query(collection(db, 'reviews'), where('id', '==', id));
            const snapshot = await getDocs(q);
            const result = snapshot.docs.map(doc => doc.data());
            setReviews(result);
        };

        loadReviews();
    }, [id]);

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !reviewText.trim()) return;

        const displayName = user.displayName || (user.email ? user.email.split('@')[0] : 'Anonymous');

        const review = {
            id: id,
            user: {
                displayName,
                uid: user.uid
            },
            review: reviewText.trim(),
            createdAt: Timestamp.now()
        };

        try {
            await addDoc(collection(db, 'reviews'), review);
            setReviews(prev => [...prev, review]);
            setReviewText('');
        } catch (err) {
            console.error('Error submitting review:', err);
        }
    };

    if (loading) return <p className="container">Loading book details...</p>;
    if (error) return <p className="container" style={{ color: 'red' }}>{error}</p>;
    if (!book) return <p className="container">No book details found.</p>;

    const info = book.volumeInfo;

    const bookData = {
        id,
        title: info.title,
        authors: info.authors || [],
        image: info.imageLinks?.thumbnail || '',
        createdAt: new Date()
    };

    return (
        <div className="container book-details">
            <h1>{info.title}</h1>
            <h3>{info.authors?.join(', ') || 'Unknown Author(s)'}</h3>
            <img
                src={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                alt={info.title}
            />
            <div
                className="book-description"
                dangerouslySetInnerHTML={{ __html: info.description || 'No description available.' }}
            ></div>
            <p><strong>Publisher:</strong> {info.publisher || 'Unknown'}</p>
            <p><strong>Published Date:</strong> {info.publishedDate || 'Unknown'}</p>

            <a
                href={info.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="book-link"
            >
                Click here to view this book in Google Books.
            </a>

            {user && id && (
                <div className="book-actions">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (savedWishlist) {
                                removeItem('wishlist', id);
                            } else {
                                addItem('wishlist', bookData);
                            }
                        }}
                        className="wishlist-button"
                    >
                        {savedWishlist ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (savedQueued) {
                                removeItem('queued', id);
                            } else {
                                addItem('queued', bookData);
                            }
                        }}
                        className="wishlist-button"
                    >
                        {savedQueued ? 'Remove from Queued' : 'Mark as Queued'}
                    </button>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (savedRead) {
                                removeItem('read', id);
                            } else {
                                addItem('read', bookData);
                            }
                        }}
                        className="wishlist-button"
                    >
                        {savedRead ? 'Remove from Read' : 'Mark as Read'}
                    </button>
                </div>
            )}

            <hr className="review-divider" />
            <div className="review-section">
                <h3>Reviews</h3>

                {reviews.length === 0 && <p>No reviews yet.</p>}
                <div className="review-list">
                    {reviews.map((r, i) => (
                        <div key={i} className="review-item">
                            <p style={{ marginBottom: '0.5rem' }}>
                                <strong>{r.user.displayName}</strong>
                            </p>
                            <p>{r.review}</p>
                        </div>
                    ))}
                </div>

                {user && (
                    <form onSubmit={handleReviewSubmit} className="review-form">
            <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                placeholder="Write your review..."
            />
                        <button type="submit">Submit Review</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Details;
