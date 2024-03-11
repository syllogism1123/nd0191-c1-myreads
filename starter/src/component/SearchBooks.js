import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

const SearchBooks = ({books, onSearch, addBook, myBooks, onChangeShelf}) => {
    const [query, setQuery] = useState("");
    let maxResults = 20;

    const updateQuery = (query) => {
        setQuery(query.trim());
        onSearch(query, maxResults);
    };

    //query and books change, while the component won't be re-rendered
    useEffect(() => {
    }, [query, books]);

    const booksNotOnMyShelves = query === "" ? [] : books.filter((book) => {
        const isBookInMyBooks = myBooks.some((myBook) => myBook.id === book.id);
        return (
            book.authors &&
            book.title &&
            book.subtitle &&
            book.industryIdentifiers &&
            book.imageLinks &&
            !isBookInMyBooks
        ) && (
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.subtitle.toLowerCase().includes(query.toLowerCase()) ||
            book.authors.some((author) =>
                author.toLowerCase().includes(query.toLowerCase())
            ) ||
            book.industryIdentifiers.some((isbn) =>
                isbn.identifier.toLowerCase().includes(query.toLowerCase())
            )
        );
    });

    const booksOnMyShelves = query === "" ? [] : myBooks.filter((myBook) =>
        myBook.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div>
            {
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link to="/" className="close-search">
                            Close
                        </Link>
                        <div className="search-books-input-wrapper">
                            <input
                                type="text"
                                placeholder="Search by title, author, or ISBN"
                                value={query}
                                onChange={(e) => updateQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="search-books-results">
                        {booksNotOnMyShelves.length > 0 ? (
                            <ol className="books-grid">
                                {/* booksOnMyShelves */}
                                {booksOnMyShelves.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        shelf={book.shelf}
                                        onChangeShelf={onChangeShelf}
                                    />
                                ))}

                                {/* booksNotOnMyShelves */}
                                {booksNotOnMyShelves.map((book) => (
                                    <Book
                                        key={book.id}
                                        book={book}
                                        shelf={book.shelf || "none"} // Pass 'none' if shelf is not defined
                                        onChangeShelf={(b, shelf) => addBook(b, shelf)}
                                    />
                                ))}
                            </ol>
                        ) : query !== "" ? (
                            <h2 style={{color: "red", textAlign: "center"}}>
                                No Books found
                            </h2>
                        ) : null}
                    </div>
                </div>
            }
        </div>
    );
};

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
    myBooks: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    addBook: PropTypes.func.isRequired,
};

export default SearchBooks;
