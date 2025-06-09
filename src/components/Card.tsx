import { Link } from 'react-router-dom';
import { useSavedItems } from '../context/SavedItemsContext';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

type CardProps = {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
};

const Card = ({ id, title, authors, thumbnail }: CardProps) => {
    const { isSaved, addItem, removeItem } = useSavedItems();
    const { user } = useContext(AuthContext);

    const book = {
        id,
        title,
        authors,
        image: thumbnail,
        createdAt: new Date()
    };

    const savedWishlist = isSaved('wishlist', id);
    const savedQueued = isSaved('queued', id);
    const savedRead = isSaved('read', id);

    const handleToggle = (
        e: React.MouseEvent,
        category: 'wishlist' | 'queued' | 'read',
        alreadySaved: boolean
    ) => {
        e.preventDefault();
        if (!user) return alert('Please log in to save books.');
        if (alreadySaved) {
            removeItem(category, id);
        } else {
            addItem(category, book);
        }
    };

    return (
        <Link
            to={`/book/${id}`}
            className="card-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div className="card">
                <img src={thumbnail} alt={title} />
                <h3>{title}</h3>
                <p>{authors.join(', ')}</p>
                <div className="card-icons">
                    <button onClick={(e) => handleToggle(e, 'wishlist', savedWishlist)} title="Wishlist">
                        {savedWishlist ? '❤️' : '🤍'}
                    </button>
                    <button onClick={(e) => handleToggle(e, 'queued', savedQueued)} title="Queued">
                        {savedQueued ? '📌' : '📍'}
                    </button>
                    <button onClick={(e) => handleToggle(e, 'read', savedRead)} title="Read">
                        {savedRead ? '✅' : '✔️'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default Card;
