import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import Book from "./Book";

const BookShelf = ({shelf, myBooks, onChangeShelf}) => {
    const filteredBooks = myBooks.filter((book) => book.shelf === shelf);

    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">
                {shelf === "currentlyReading" && "Currently Reading"}
                {shelf === "wantToRead" && "Want to Read"}
                {shelf === "read" && "Read"}
            </h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {filteredBooks.map((book) => (
                        <Book
                            key={book.id}
                            book={book}
                            shelf={shelf}
                            onChangeShelf={onChangeShelf}
                        />
                    ))}
                </ol>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
};

BookShelf.propTypes = {
    myBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}
export default BookShelf;
