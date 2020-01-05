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
      selectedType: '',
      pokemonsByType: null,
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

  getRandomPokemon = e => {
    e.preventDefault();

    let { results } = this.state;
    const names = results.map(el => el.name)
    console.log(names)
    let randomNum = Math.floor(Math.random() * names.length);

    let randomPokemon = names[randomNum]
        let result = results.filter(
          ({ name }) => name.toLowerCase() === randomPokemon.toLowerCase()
        );
        this.setState({
          result,
        });

  };

  getPokemonsByType = () => {
    let { results, selectedType } = this.state;
    let pokemonsByType = results.filter(
      ({ type }) =>
        type[0].toLowerCase() === selectedType ||
        (type[1] && type[1].toLowerCase() === selectedType)
    );
    this.setState({
      pokemonsByType,
    });
  };
  render() {
    const { result, error, types, pokemonsByType } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          color: 'white',
          flexDirection: 'column',
          fontFamily: 'avenir',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          border: '2px solid black',
          backgroundColor: 'rgb(65,65,65)',
        }}
      >
        <h1>Poké-Search</h1>
        {result ? (
          <div>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <img
                style={{ height: '100px' }}
                src={result[0]['sprites'].animated}
                alt='gif'
              />
            </div>

            <table
              style={{
                textAlign: 'left',
                margin: '10px',
              }}
            >
              <thead style={{ fontWeight: 'bolder' }}></thead>
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>#{result[0].name}</td>
                </tr>
                <tr>
                  <th>No.</th>
                  <td>#{result[0]['national_number']}</td>
                </tr>
                <tr>
                  <th>Type</th>
                  {result[0].type.map((t, index) => (
                    <td key={index}>{t}</td>
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
                <tr>
                  <th>Special Attack</th>
                  <td>{result[0].sp_atk}</td>
                </tr>
                <tr>
                  <th>Special Defense</th>
                  <td>{result[0].sp_def}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
            }}
          >
            <h3>Learn about your favorite Pokemon</h3>
            <img
              height='200px'
              src='https://cdn.dribbble.com/users/815728/screenshots/4046362/ball.gif'
              alt='loading'
            />
          </div>
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
            onChange={e => {
              this.handleChange(e);
              this.getPokemonsByType();
            }}
            name='selectedType'
            style={{
              width: '100%',
              marginTop: '4px',
              fontSize: '1.5rem',
              textAlign: 'center',
              display: 'block',
            }}
          >
            {types.map(({ name }, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </form>
        {pokemonsByType &&
          pokemonsByType.map((el, index) => (
            <div key={index}>
              <img src={el.sprites.normal} alt='pic' />
              <table
                style={{
                  textAlign: 'left',
                }}
              >
                <tbody>
                  <tr>
                    <th>{el.name}</th>
                  </tr>
                  <tr>
                    <th>No.</th>
                    <td>#{el['national_number']}</td>
                  </tr>
                  <tr>
                    <th>HP</th>
                    <td>{el.hp}</td>
                  </tr>
                  <tr>
                    <th>Attack</th>
                    <td>{el.attack}</td>
                  </tr>
                  <tr>
                    <th>Speed</th>
                    <td>{el.speed}</td>
                  </tr>
                  <tr>
                    <th>Defense</th>
                    <td>{el.defense}</td>
                  </tr>
                  <tr>
                    <th>Special Attack</th>
                    <td>{el.sp_atk}</td>
                  </tr>
                  <tr>
                    <th>Special Defense</th>
                    <td>{el.sp_def}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
      </div>
    );
  }
}

export default PokeSearch;
