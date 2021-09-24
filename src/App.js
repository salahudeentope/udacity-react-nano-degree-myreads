import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves.js'
import Search from  './components/Search.js'
import SearchButton from './components/SearchButton'
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import {debounce} from 'throttle-debounce'



class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchBooks: []

  }

  searchForBooks = debounce(300, false, query => {
    if (query.length > 0) {
        BooksAPI.search(query).then(books => {
            if (books.error) {
                this.setState({ searchBooks: [] });
            } else {
                this.setState({ searchBooks: books });
            }
        });
    } else {
        this.setState({ searchBooks: [] });
    }
});
resetSearch = () => {
    this.setState({ searchBooks: [] });
};

  componentDidMount () {
      BooksAPI.getAll().then((response) => (
        this.setState((prevState) => {
        return { books: response}
        }

      )))

  }

  changeShelf = (book, newValue) => {

    book.shelf = newValue;

    this.setState( (state) => ({
        books: state.books.filter( (b) => b.id !== book.id).concat([book])
    }))

    BooksAPI.update(book, newValue);

}


  render() {
    return (
      <div className="app">

            <Route exact path="/search" render={() => (
            <Search onSearch={this.searchForBooks}
            searchBooks ={this.state.searchBooks}
            onMove={this.changeShelf}
            onResetSearch={this.resetSearch}
            books={this.state.books}
            />
              )}/>
          <Route exact path='/' render ={() => (
            <div>
            <Header />
            <Shelves allBooks={this.state.books} changeShelf={this.changeShelf}/>

            <SearchButton />
            </div>
        )}
        />
      </div>
    )
  }
}

export default BooksApp
