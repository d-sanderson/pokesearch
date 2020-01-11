import React from 'react';
import ImageWithStatusText from './ImageWithStatusText';

const PokeballLoading = () => {
  return (
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
  );
};

export default PokeballLoading;
