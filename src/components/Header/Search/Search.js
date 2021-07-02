import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();

    this.state = {
      userInput: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(e){
    this.setState({userInput: e.target.value});
  }

  handleClick(){
    this.props.search(this.state.userInput);
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input 
            placeholder="Search Your Feed"
            value={this.state.userInput}
            onChange={(e) => this.handleChange(e)}
          />

          <SearchIcon id="Search__icon" onClick={this.handleClick}/>
        </div>
        
      </section>
    )
  }
}