import React from "react";
import Shelf from "./Shelf";
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

class Search extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    searchBooks: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onMove: PropTypes.func.isRequired
}

    state = {
        value: '',
    };
    handleChange = event => {
        const val = event.target.value;
        this.setState({ value: val }, () => {
            this.props.onSearch(val);
        });
    };


    render(){
        // const {onSearch, searchBooks, onMove, onResetSearch, showHomePage, books} = this.props;
          const searchBooks = this.props.searchBooks
          const  myBooks = this.props.books
        
            let updatedBooks = searchBooks.map(book => {
                myBooks.map(b => {
                    if (b.id === book.id) {
                        book.shelf = b.shelf;
                    }
                    return b;
                });
                return book;
            });
        
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to='/'>Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                    value={this.state.value}
                    placeholder="Search by title or author"
                    onChange={this.handleChange}
                    autoFocus />

              </div>
            </div>
            <Shelf books={updatedBooks} changeShelf={this.props.onMove}/>
            {/* <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div> */}
          </div>
            )
       }
    }



export default Search 