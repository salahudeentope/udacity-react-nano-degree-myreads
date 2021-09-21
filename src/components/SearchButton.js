import React from "react";

class SearchButton extends React.Component {


    render(){
        return (
           // {/* SearchButton component */}
            <div className="open-search">
              <button onClick={() => this.props.showHomePage (true )}>Add a book</button>
            </div>
        )
    }
}


export default SearchButton 