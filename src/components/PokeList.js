import React from 'react';
import ImageWithStatusText from './ImageWithStatusText';

const PokeList = props => {
  const { index, pokemon } = props;
  return (
    <div key={index}>
      <ImageWithStatusText imageUrl={pokemon.sprites.normal} alt='pic' />
      <table
        style={{
          textAlign: 'left',
          fontSize: '.7rem',
        }}
      >
        <tbody>
          <tr>
            <th>{pokemon.name}</th>
          </tr>
          <tr>
            <th>No.</th>
            <td>#{pokemon['national_number']}</td>
          </tr>
          <tr>
            <th>Type</th>
            <td>{pokemon.type.map(type => `${type} `)}</td>
          </tr>
          <tr>
            <th>HP</th>
            <td>{pokemon.hp}</td>
          </tr>
          <tr>
            <th>Attack</th>
            <td>{pokemon.attack}</td>
          </tr>
          <tr>
            <th>Speed</th>
            <td>{pokemon.speed}</td>
          </tr>
          <tr>
            <th>Defense</th>
            <td>{pokemon.defense}</td>
          </tr>
          <tr>
            <th>Special Attack</th>
            <td>{pokemon.sp_atk}</td>
          </tr>
          <tr>
            <th>Special Defense</th>
            <td>{pokemon.sp_def}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PokeList;
