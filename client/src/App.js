import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'

import ListRecipes from './queries/list-recipes'

import logo from './logo.svg';

import './App.css';

class App extends Component {
  render() {
    console.log('Props:', this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default graphql(ListRecipes, {
  options: {
    fetchPolicy: 'cache-and-network',
    props: props => ({
      recipes: props.data.listRecipes ? props.data.listRecipes.items : []
    })
  }
})(App);
