import React, { Component } from 'react';
import pokemons from 'pokemons';

class PokeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: pokemons.results,
      pokemon: '',
      result: '',
      error: false,
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  searchByName = e => {
    e.preventDefault();
    let { pokemon } = this.state;

    let result = this.state.results.filter(
      ({ name }) => name.toLowerCase() === pokemon.toLowerCase()
    );
    if (result.length === 0) {
      this.setState({
        error: true,
        result: ''
      });
      return;
    }
    this.setState({
      result,
      error: false,
    });
  };
  render() {
    const { result, error } = this.state;
    console.log(result);
    return (
      <div
        style={{
          display: 'flex',
          color: 'white',
          flexDirection: 'column',
          fontFamily: 'avenir',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          border: '2px solid black',
          backgroundColor: 'rgb(65,65,65)',
        }}
      >
        {result ? (
            <div>
              <img
                style={{
                  margin: '50px 0 0 0',
                  height: '150px',
                }}
                src={result[0]['sprites'].animated}
                alt='gif'
              />
              <div>#{result[0]['national_number']}</div>
              <div>
                {result[0].type.map(t => (
                  <div>{t}</div>
                ))}
              </div>
              <div>hp: {result[0].hp}</div>
              <div>Attack: {result[0].attack}</div>
              <div>Speed: {result[0].speed}</div>
              <div>Defense: {result[0].defense}</div>
              <div>Special Attack: {result[0].sp_atk}</div>
              <div>Special Defense: {result[0].sp_def}</div>
            </div>
          ):
          <img height='150px' src="https://cdn.dribbble.com/users/815728/screenshots/4046362/ball.gif" alt="loading"/>}
        <form>
          <h1>PokeSearch</h1>
          <input
            name='pokemon'
            placeholder='Search for a pokemon'
            onChange={this.handleChange}
          />
          {error && <div>Pokemon does not exist.</div>}
          <button
            style={{
              display: 'block',
            }}
            value='Search'
            onClick={this.searchByName}
          >
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default PokeSearch;
