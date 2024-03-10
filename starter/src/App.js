import "./App.css";
import {useEffect, useState} from "react";
import * as BooksAPI from './utils/BooksAPI';
import SearchBooks from "./component/SearchBooks";
import BookShelf from "./component/BookShelf";
import {Route, Routes} from "react-router-dom";

function App() {

    const [books, setBooks] = useState([]);
    const [myBooks, setMyBooks] = useState([]);
    const shelves = ['currentlyReading', 'wantToRead', 'read'];

    useEffect(() => {
        const getBooks = async () => {
            const res = await BooksAPI.getAll();
            setMyBooks(res);
        }
        getBooks().catch(e => {
            console.error(e)
        });
    }, []);

    const handleChangeShelf = (book, newShelf) => {
        const update = async () => {
            await BooksAPI.update(book, newShelf);
            const updateBooks = myBooks.map(b => {
                if (b.id === book.id) {
                    return {
                        ...b,
                        shelf: newShelf
                    }
                } else {
                    return b;
                }
            })
            setMyBooks(updateBooks)
        }

        update().catch(e => {
            console.error(e)
        });
    }

    const handleSearch = (query, maxResults) => {
        const search = async () => {
            const res = await BooksAPI.search(query, maxResults);
            console.log(res)
            if (res && Array.isArray(res)) {
                setBooks(res);
            }
        }
        search().catch(e => {
            console.error(e)
        });
    }

    const handleAddBook = async (book, newShelf) => {
        const isBookInMyBooks = myBooks.some(b => b.id === book.id);
        // If the book is not already in myBooks, add it with the specified shelf
        if (!isBookInMyBooks) {
            try {
                // Update the book's shelf locally
                book.shelf = newShelf;

                // Update the backend API with the new shelf
                await BooksAPI.update(book, newShelf);

                // Update myBooks state with the new book added
                setMyBooks(prevBooks => [...prevBooks, book]);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <div className="app">
            <Routes>
                <Route path='/' element={
                    <div className="list-books-content">
                        {
                            shelves.map(shelf => (
                                <BookShelf
                                    key={shelf}
                                    shelf={shelf}
                                    myBooks={myBooks}
                                    onChangeShelf={(book, shelf) => {
                                        handleChangeShelf(book, shelf)
                                    }}/>))
                        }
                    </div>
                }>
                </Route>
                <Route path='/search' element={
                    <SearchBooks
                        books={books}
                        myBooks={myBooks}
                        addBook={(book, shelf) => handleAddBook(book, shelf)}
                        onSearch={(query, maxResults) => handleSearch(query, maxResults)}
                    />}>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
