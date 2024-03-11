import React from 'react';
import PropTypes from 'prop-types';

const Book = ({book, shelf, onChangeShelf}) => {
    return (
        <li key={book.id}>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}
                    ></div>
                    <div className="book-shelf-changer">
                        <select
                            defaultValue={shelf}
                            onChange={(e) => onChangeShelf(book, e.target.value)}
                        >
                            <option value="none" disabled>
                                {book.shelf ? "Move to..." : "Add to ..."}
                            </option>
                            <option value="currentlyReading">
                                {shelf === "currentlyReading" && "✔ "}Currently Reading
                            </option>
                            <option value="wantToRead">
                                {shelf === "wantToRead" && "✔ "}Want to Read
                            </option>
                            <option value="read">
                                {shelf === "read" && "✔ "}Read
                            </option>
                            {book.shelf && (
                                <option value="none">None</option>
                            )}
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {book.authors.join(', ')}
                </div>
            </div>
        </li>
    );
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired
};

export default Book;
