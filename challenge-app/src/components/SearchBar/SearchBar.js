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
        this.props.getUsers(this.props.firstHandle,this.props.secondHandle);
    }

    handleSearch(event){
        this.props.getTweets(this.props.firstHandle,this.props.secondHandle);
        this.props.getUsers(this.props.firstHandle,this.props.secondHandle);
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