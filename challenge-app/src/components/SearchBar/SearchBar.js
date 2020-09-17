import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearch = this.handleSearch.bind(this);
        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleSecondChange = this.handleSecondChange.bind(this);
    }

    componentDidMount() {
        this.props.getTweets(this.props.firstHandle,this.props.secondHandle);
    }

    handleSearch(event){
        this.props.getTweets(this.props.firstHandle,this.props.secondHandle);
        event.preventDefault();
    }

    handleFirstChange(event){
        this.props.handleFirstChange(event.target.value);
    }

    handleSecondChange(event){
        this.props.handleSecondChange(event.target.value);
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="firstHandle">
                    <input onChange={this.handleFirstChange} placeholder="user handle 1"/>
                </div>
                <div className="secondHandle">
                    <input onChange={this.handleSecondChange} placeholder="user handle 2"/>
                </div>
                <div className="SearchBar-submit">
                    <button onClick={this.handleSearch}>Update Tweets</button>
                </div>
            </div>
        );
    }
}

export default SearchBar;