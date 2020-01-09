import React from 'react';
import ImageWithStatusText from './ImageWithStatusText';

const PokeStatsDisplay = props => {
  const { result } =  props
  console.log(result)
  console.log(result);
  return (
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
  );
};

export default PokeStatsDisplay;
