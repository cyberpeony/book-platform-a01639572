import { searchBooks } from '../services/api';
import Card from '../components/Card';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchFeaturedBooks = async () => {
            const results = await searchBooks('bestseller fiction');
            setBooks(results);
        };
        fetchFeaturedBooks();
    }, []);

    return (
        <div className="container">
            <h1>📚 Welcome to Book Discovery Platform 📚</h1>
            <p>Here are some fiction current bestsellers:</p>

            <div className="results-grid">
                {books.map((book: any) => {
                    const info = book.volumeInfo;
                    return (
                        <Card
                            id={book.id}
                            title={info.title}
                            authors={info.authors || ['Unknown']}
                            thumbnail={info.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Home;
