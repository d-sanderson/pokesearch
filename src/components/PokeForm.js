import React from 'react';

const PokeForm = (props) => {
  const { handleChange, searchByName, getRandomPokemon, getPokemonsByType, types } = props
  return (
    <form>
      <input
        style={{
          fontSize: '.75rem',
          width: '100%',
          textAlign: 'center',
        }}
        name='searchTerm'
        placeholder='Search for a Pokémon!'
        onClick={handleChange}
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
        onClick={searchByName}
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
        onClick={getRandomPokemon}
      >
        Random
      </button>
      <label>Get Pokemons by type:</label>
      <select
        onChange={e => {
          handleChange(e);
          getPokemonsByType(e);
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
  );
};

export default PokeForm;
