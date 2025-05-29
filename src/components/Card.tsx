import { Link } from 'react-router-dom';

type CardProps = {
    id: string;
    title: string;
    authors: string[];
    thumbnail: string;
};

const Card = ({ id, title, authors, thumbnail }: CardProps) => {
    return (
        <Link to={`/book/${id}`} className="card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="card">
                <img src={thumbnail} alt={title} />
                <h3>{title}</h3>
                <p>{authors.join(', ')}</p>
            </div>
        </Link>
    );
};

export default Card;
