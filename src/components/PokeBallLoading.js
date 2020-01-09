import React, { Component } from 'react';
import ImageWithStatusText from './ImageWithStatusText'
class Pokeball extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
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
    </div> );
  }
}

export default Pokeball;