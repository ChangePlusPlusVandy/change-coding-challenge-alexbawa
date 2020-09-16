import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    contructor(props) {
        super(props);
        this.state = {
            firstHandle = 'Kanye',
            secondHandle = 'Elon'
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleSecondChange = this.handleSecondChange.bind(this);
    }

    handleSearch(event){
        this.props.getTweets(this.state.firstHandle,this.state.secondHandle);
        event.preventDefault();
    }

    handleFirstChange(event){
        this.setState({firstHandle: event.target.value});
    }

    handleSecondChange(event){
        this.setState({secondHandle: event.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                
                <div className="SearchBar-fields">
                    <div className="firstHandle">
                        <input onChange={this.handleFirstChange} placeholder={this.state.firstHandle}/>
                    </div>
                    <div className="secondHandle">
                        <input onChange={this.handleSecondChange} placeholder={this.state.secondHandle}/>
                    </div>
                </div>
                <div className="SearchBar-submit">
                    <a onClick={this.handleSearch}>Update Tweets</a>
                </div>
            </div>
        );
    }
}