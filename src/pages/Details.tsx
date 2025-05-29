import { useParams } from 'react-router-dom';
import { getBookById } from '../services/api';

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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

    if (loading) return <p className="container">Loading book details...</p>;
    if (error) return <p className="container" style={{ color: 'red' }}>{error}</p>;
    if (!book) return <p className="container">No book details found.</p>;

    const info = book.volumeInfo;

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
            <a href={info.previewLink} target="_blank" rel="noopener noreferrer">
                Click here to view this book in Google Books.
            </a>
        </div>
    );
};

export default Details;
