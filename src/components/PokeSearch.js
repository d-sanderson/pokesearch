import React, { Component } from 'react';
import pokemons from 'pokemons';

import PokeStatsDisplay from './PokeStatsDisplay'
import PokeBallLoading from './PokeBallLoading'
import PokeForm from './PokeForm'
import PokeList from './PokeList'
import ImageWithStatusText from './ImageWithStatusText';
import Error from './Error';


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
    let { searchTerm, results } = {...this.state};

    let result = results.filter(
      ({ name }) => name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (result.length === 0) {
      this.setState({
        error: true,
        result: '',
        pokemonsByType: null,
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
    return (type[0] !== undefined && type[1] !== undefined) ?
    (type[0].toLowerCase() === lcSelectedType || type[1].toLowerCase() === lcSelectedType) :
    (type[0].toLowerCase() === lcSelectedType)
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
          <PokeStatsDisplay result={result} />
        ) : !pokemonsByType ? (
          <PokeBallLoading />
        ) : ''}
        {error && (
          <Error/>
        )}
        <PokeForm
          handleChange={this.handleChange}
          searchByName={this.searchByName}
          getRandomPokemon={this.getRandomPokemon}
          getPokemonsByType={this.getPokemonsByType}
          types={types}
        />
        {pokemonsByType &&
          pokemonsByType.map((el, index) => (
            <PokeList pokemon={el} index={index} />
          ))}
      </div>
    );
  }
}

export default PokeSearch;
