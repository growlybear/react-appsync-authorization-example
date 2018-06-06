import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'

import ListRecipes from './queries/list-recipes'

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    name: '',
    ingredient: '',
    ingredients: [],
    direction: '',
    directions: []
  }
  onChange = (key, value) => {
    this.setState({ [key]: value })
  }
  addIngredient = () => {
    const ingredient = this.state.ingredient
    // prevent empty ingredients from being added to array
    if (ingredient) {
      this.setState({
        ingredients: [...this.state.ingredients, ingredient],
        ingredient: ''
      })
    }
  }
  addDirection = () => {
    const direction = this.state.direction
    // prevent empty directions from being added to array
    if (direction) {
      this.setState({
        directions: [...this.state.directions, direction],
        direction: ''
      })
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <ul>
            { this.props.recipes.map(recipe => (
              <li key={recipe.id}>{ recipe.name }</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default compose(
  graphql(ListRecipes, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => ({
      recipes: props.data.listRecipes ? props.data.listRecipes.items : []
    })
  })
)(App);
