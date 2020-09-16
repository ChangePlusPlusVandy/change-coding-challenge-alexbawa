import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    contructor(props) {
        super(props);
        this.state = {
            firstHandle = 'Kanye',
            secondHandle = 'Elon'
        };
    }

    render() {
        return (
            <div className="SearchBar">
                
            </div>
        );
    }
}