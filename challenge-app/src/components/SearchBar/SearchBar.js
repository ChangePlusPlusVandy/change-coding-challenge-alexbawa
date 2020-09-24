import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
    constructor() {
        super();

        //Bind all "this" in all functions to this class
        this.handleSearch = this.handleSearch.bind(this);
        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleSecondChange = this.handleSecondChange.bind(this);
    }

    //When component mounts, call getTweets() and getUsers() from parent container
    componentDidMount() {
        this.props.getTweets(this.props.firstHandle,this.props.secondHandle);
        this.props.getUsers(this.props.firstHandle,this.props.secondHandle);
    }

    //When search button pressed, call getTweets() and getUsers() from parent container
    handleSearch(event){
        this.props.getTweets(this.props.firstHandle,this.props.secondHandle);
        this.props.getUsers(this.props.firstHandle,this.props.secondHandle);
        event.preventDefault();
    }

    //When value of first input changes, call handler from parent container
    handleFirstChange(event){

        //Call handler from parent container with new input value
        this.props.handleFirstChange(event.target.value);
    }

    //When value of second input changes, call handler from parent container
    handleSecondChange(event){

        //Call handler from parent container with new input value
        this.props.handleSecondChange(event.target.value);
    }

    render() {
        return (
            <div className="SearchBar">
                <div className="firstHandle">
                    <input onChange={this.handleFirstChange} placeholder="Username"/>
                </div>
                <div className="secondHandle">
                    <input onChange={this.handleSecondChange} placeholder="Username"/>
                </div>
                <div className="SearchBar-submit">
                    <p onClick={this.handleSearch}>Update Tweets</p>
                </div>
            </div>
        );
    }
}

export default SearchBar;