import React, {Component} from 'react';

class SearchImageFunc extends Component {
    constructor(){
        super();
        this.state = {
          text : ''
        };
    }
    
    textChangeHandler = (event) => {
        this.setState({text: event.target.value});
    }

    showImagesOnSearch(){
        const url = window.location.href;
        fetch (url,{
            method:'GET'
        }).then(results => {
        }).then(data => {
        })
    }
    
    render() {
        return (
            <form onSubmit={this.showImagesOnSearch}> 
                <input
                type="text"
                className="search-box"
                placeholder="Search for..."
                onChange={this.textChangeHandler}
                value={this.state.text}
                name='searchImageBox'
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default SearchImageFunc;