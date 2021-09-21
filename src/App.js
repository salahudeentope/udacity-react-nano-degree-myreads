import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves.js'
import Search from  './components/Search.js'
import SearchButton from './components/SearchButton'
import Header from './components/Header'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []

  }

  updateSearchPageState = state =>{
    this.setState({showSearchPage: state})
  }

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
//(book, shelf) => {
//     this.setState({
//       books: this.state.books.map(b => {
//         return b.id === book.id ? (b.shelf = shelf) : b
//       })
//     })
//   }

//   moveBookShelf = (book, newValue) => {

//     book.props.book.shelf = newValue;

//     this.setState( (state) => ({
//         books: state.books.filter( (b) => b.id !== book.props.book.id).concat([book.props.book])
//     }))

//     BooksAPI.update(book.props.book, newValue);

// }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
         
         <Search showHomePage={this.updateSearchPageState}/>
        ) : (
          <div className="list-books">

            <Header />
            <Shelves allBooks={this.state.books} changeShelf={this.changeShelf}/>

            <SearchButton showHomePage={this.updateSearchPageState}/>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
