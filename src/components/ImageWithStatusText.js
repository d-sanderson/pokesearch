import React from "react";

class ImageWithStatusText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageStatus: "loading" };
  }

  componentWillReceiveProps() {
    this.setState({
      imageStatus: 'loading'
    })
  }
  handleImageLoaded() {
    this.setState({ imageStatus: "loaded" });
  }

  handleImageErrored() {
    this.setState({ imageStatus: "gif failed to load" });
  }

  render() {
    const {imageStatus} = this.state
    return (
      <div>
        {imageStatus === 'loaded' || imageStatus === 'loading' ?
        <img
          height='200px'
          src={this.props.imageUrl}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          alt='img'
        />
        : <div
        style={{
          textAlign: 'center'
        }}>
          <img style={{
             borderRadius: '50px',
             height: '180px',
             width: '180px',
             margin: '10px 0',
          }} src='https://media0.giphy.com/media/m6aZERsqxPiBa/giphy.gif?cid=790b76114ed6989bc2a98b52d46b213a75fc63689eb146b5&rid=giphy.gif' alt='lol'/>
          <h4>{imageStatus}</h4>
          </div>}
      </div>
    );
  }
}
export default ImageWithStatusText;