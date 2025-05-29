import { useState } from 'react';
import { searchBooks } from '../services/api';
import Card from '../components/Card';

const Search = () => {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState([]);

    const handleSearch = async () => {
        if (query.trim() === '') return;
        const results = await searchBooks(query);
        setBooks(results);
    };

    return (
        <div className="container">
            <h1>📖 Book Discovery Platform 📖</h1>
            <p style={{ marginBottom: '1.5rem' }}>Search for books here!</p>

            <input
                type="text"
                placeholder="Search books..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

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

export default Search;
