import React, { Component } from 'react';
import pokemons from 'pokemons';

class Pokedex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: pokemons.results,
      pokemon: '',
      result: '',
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
      return;
    }
    this.setState({
      result,
    });
  };
  render() {
    const { result } = this.state;
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
          height: '500px',
          border: '2px solid black',
          margin: '0% 33%',
          backgroundColor: 'red',
        }}
      >
        <form>
          <h1>PokeSearch</h1>
          <input
            name='pokemon'
            placeholder='Search for a pokemon'
            onChange={this.handleChange}
          />
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
        <div>
          {result && (
            <div>
              <img
                style={{
                  margin: '50px 0 0 0',
                  height: '75px',
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
          )}
        </div>
      </div>
    );
  }
}


export default Pokedex;
