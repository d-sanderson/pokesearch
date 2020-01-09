import React, { Component } from 'react';
import pokemons from 'pokemons';
import ImageWithStatusText from './ImageWithStatusText';
class PokeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: pokemons.results,
      searchTerm: '',
      result: '',
      error: false,
      types: [
        'Normal',
        'Fighting',
        'Flying',
        'Poison',
        'Ground',
        'Rock',
        'Bug',
        'Ghost',
        'Steel',
        'Fire',
        'Grass',
        'Water',
        'Electric',
        'Psychic',
        'Ice',
        'Dragon',
        'Dark',
        'Fairy',
      ],
      pokemonsByType: null,
      selectedType: ''
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
    const names = results.map(el => el.name);
    let randomNum = Math.floor(Math.random() * names.length);

    let randomPokemon = names[randomNum];
    let result = results.filter(
      ({ name }) => name.toLowerCase() === randomPokemon.toLowerCase()
    );
    if (result) {
      this.setState({
        result,
        error: false,
        pokemonsByType: null,
      });
    }
  };

  getPokemonsByType = (e) => {
    const { results } = {...this.state};
    const lcSelectedType = e.target.value.toLowerCase();
    console.log(lcSelectedType)
    let pokemonsByType = results.filter(({ type }) => {
    if(type[0] !== undefined && type[1] !== undefined) {
      return (type[0].toLowerCase() === lcSelectedType || type[1].toLowerCase() === lcSelectedType)
    }

    else if(type.length === 1) return (type[0].toLowerCase() === lcSelectedType

    );
  })


    if (pokemonsByType.length >= 1) {
      this.setState({
        pokemonsByType,
        error: false,
        result: ''
      });
    }

  };
  render() {
    const { result, error, types, pokemonsByType } = this.state;
    return (
      <div
        style={{
          display: 'flex',
          color: 'white',
          flexDirection: 'column',
          fontFamily: 'Press Start 2P',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'auto',
          border: '2px solid black',
          backgroundColor: 'rgb(65,65,65)',
        }}
      >
        <p>Poké-Search</p>
        {result ? (
          <div>
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <ImageWithStatusText imageUrl={result[0]['sprites'].animated} />
            </div>

            <table
              style={{
                textAlign: 'left',
                margin: '10px',
                fontSize: '.7rem',
              }}
            >
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
            <p>Learn about your favorite Pokemon</p>
            <ImageWithStatusText
              height='200px'
              imageUrl='https://cdn.dribbble.com/users/815728/screenshots/4046362/ball.gif'
              alt='loading'
            />
          </div>
        )}
        {error && (
          <div
            className='error'
            style={{
              textAlign: 'center',
              margin: '2% 0',
            }}
          >
            Pokemon does not exist.
          </div>
        )}
        <form>
          <input
            style={{
              fontSize: '.75rem',
              width: '100%',
              textAlign: 'center',
            }}
            name='searchTerm'
            placeholder='Search for a Pokémon!'
            onClick={this.handleChange}
          />
          <button
            style={{
              width: '100%',
              margin: '10px 0',
              fontSize: '1.1rem',
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
              margin: '10px 0',
              fontSize: '1.1rem',
              textAlign: 'center',
              display: 'block',
            }}
            value='Search'
            onClick={this.getRandomPokemon}
          >
            Random
          </button>
          <label>Get Pokemons by type:</label>
          <select
            onChange={e => {
              this.handleChange(e);
              this.getPokemonsByType(e);
            }}

            name='selectedType'
            style={{
              width: '100%',
              margin: '10px 0',
              fontSize: '1.1rem',
              display: 'block',
            }}
          >
            {types.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>
        </form>
        {pokemonsByType &&
          pokemonsByType.map((el, index) => (
            <div key={index}>
              <ImageWithStatusText imageUrl={el.sprites.normal} alt='pic' />
              <table
                style={{
                  textAlign: 'left',
                  fontSize: '.7rem',
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
                    <th>Type</th>
                    <td>{el.type.map(type => `${type} `)}</td>
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
