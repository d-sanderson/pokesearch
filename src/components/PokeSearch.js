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
      types: ['Search By Type'],
    };
  }
  async componentDidMount() {
    const response = await fetch(`https://pokeapi.co/api/v2/type`);
    const types = await response.json();
    this.setState({ types: types.results });
    console.log(this.state.types);
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  searchByName = e => {
    e.preventDefault();
    let { searchTerm } = this.state;

    let result = this.state.results.filter(
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
        <h1>Poké-Search</h1>
        {result ? (
          <div>
            <img
              style={{
                height: '150px',
              }}
              src={result[0]['sprites'].animated}
              alt='gif'
            />
            <div>

            </div>
            <table
            style={{
              textAlign: 'left'
            }}>
               <tr>
                <th>No.</th>
                <td>#{result[0]['national_number']}</td>
              </tr>
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
        </form>
        <select>
          {this.state.types.map(({ name }) => (
            <option name={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default PokeSearch;
