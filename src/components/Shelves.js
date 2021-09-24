import React from "react";
import Shelf from './Shelf'
import PropTypes from 'prop-types'

class Shelves extends React.Component {

    static propTypes = {
        allBooks: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    }

    render(){
        const allBooks = this.props.allBooks
        console.log(allBooks)
        const read = allBooks.filter((book) => book.shelf === 'read')
        const wantToRead = allBooks.filter((book) => book.shelf === 'wantToRead')
        const currentlyReading = allBooks.filter((book) => book.shelf === 'currentlyReading')
        return (
            // {/* Shelves component */}
            <div className="list-books-content">
              <div>

                  <Shelf books={currentlyReading} title='Currently Reading' changeShelf ={this.props.changeShelf}/>
                  <Shelf books={wantToRead} title='Want To Read' changeShelf ={this.props.changeShelf}/>
                  <Shelf books={read} title='Read' changeShelf ={this.props.changeShelf}/>


              </div>
            </div>

        )
    }
}


export default Shelves