import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo'
import uuid from 'uuid/v4'

import ListRecipes from './queries/list-recipes'
import CreateRecipe from './mutations/create-recipe'

import logo from './logo.svg';

import './App.css';

const styles = {
  input: {
    border: 'none',
    borderBottom: '2px solid blue',
    fontSize: 22,
    height: 50,
    margin: 10,
    width: 300,
  }
}

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
  addRecipe = () => {
    const { name, ingredients, directions } = this.state
    this.props.onAddRecipe({
      id: uuid(),
      name,
      ingredients,
      directions
    })
    this.setState({
      name: '',
      ingredient: '',
      direction: ''
    })
  }
  render() {
    console.log('Props:', this.props)
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
          <input
            placeholder='Recipe Name'
            style={styles.input}
            onChange={evt => this.onChange('name', evt.target.name)}
          />
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
  }),
  graphql(CreateRecipe, {
    props: props => ({
      onAddRecipe: recipe => props.mutate({
        variables: recipe
      })
    })
  })
)(App);
