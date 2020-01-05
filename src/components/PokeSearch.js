import React, { Component } from 'react';
import pokemons from 'pokemons';

class PokeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: pokemons.results,
      searchTerm: '',
      result: '',
      error: false,
      types: [],
      type: ''
    };
  }
  async componentDidMount() {
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    const types = await response.json();
    this.setState({ types: types.results });
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  searchByName = e => {
    e.preventDefault();
    let { searchTerm, results } = this.state;

    let result = results.filter(
      ({ name }) => name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (result.length === 0) {
      this.setState({
        error: true,
        result: '',
      });
      return;
    }
    this.setState({
      result,
      error: false,
    });
  };

  getRandomPokemon = (e) => {
    e.preventDefault()
    let { results } = this.state;
    let randomNum = Math.floor(Math.random() * 964)
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomNum}`).then((response) => {
      return response.json();
    })
    .then((pokemon) => {
      let result = results.filter(
        ({ name }) => name.toLowerCase() === pokemon.name.toLowerCase()
      );
      this.setState({
        result
      })
  })
}
  render() {
    const { result, error } = this.state;
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
        <h1>Poké-Search</h1>
        {result ? (
          <div>

      <div style={{
        textAlign: 'center',
      }}>
            <img
              style={{height: '100px'}}
              src={result[0]['sprites'].animated}
              alt='gif'
            />

<h1>{result[0].name}</h1>
            </div>

            <table
            style={{
              textAlign: 'left',
              margin: '10px'
            }}>

                <th>No.</th>
                <td>#{result[0]['national_number']}</td>
              <tr>
                <th>Type</th>
                {result[0].type.map(t => (
                <td>{t}</td>
              ))}
              </tr>
              <tr>
                <th>HP</th>
                <td>{result[0].hp}</td>
              </tr>
              <tr>
                <th>Attack</th>
                <td>{result[0].attack}</td>
              </tr>
              <tr>
                <th>Speed</th>
                <td>{result[0].speed}</td>
                </tr>
                <tr>
                  <th>Defense</th>
                <td>{result[0].defense}</td>
                </tr>
                <tr>  <th>Special Attack</th>  <td>{result[0].sp_atk}</td></tr>
             <tr>
               <th>Special Defense</th>
                <td>{result[0].sp_def}</td>
              </tr>
            </table>
          </div>
        ) : (
          <img
            height='200px'
            src='https://cdn.dribbble.com/users/815728/screenshots/4046362/ball.gif'
            alt='loading'
          />
        )}
        {error && <div>Pokemon does not exist.</div>}
        <form>
          <input
            style={{
              fontFamily: 'avenir',
              fontSize: '1.5rem',
            }}
            name='searchTerm'
            placeholder='Search for a Pokémon!'
            onChange={this.handleChange}
          />
          <button
            style={{
              width: '100%',
              marginTop: '4px',
              fontSize: '1.5rem',
              textAlign: 'center',
              display: 'block',
            }}
            value='Search'
            onClick={this.searchByName}
          >
            Search
          </button>
          <button
            style={{
              width: '100%',
              marginTop: '4px',
              fontSize: '1.5rem',
              textAlign: 'center',
              display: 'block',
            }}
            value='Search'
            onClick={this.getRandomPokemon}
          >
            Random
          </button>
          <select
        onChange={this.handleChange}
        name='type'
        style={{
          width: '100%',
          marginTop: '4px',
          fontSize: '1.5rem',
          textAlign: 'center',
          display: 'block',
        }}
        >
          {this.state.types.map(({ name }, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>
        </form>

      </div>
    );
  }
}

export default PokeSearch;
