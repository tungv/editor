import React from 'react';

const styles = {
  root: {
    position: 'absolute',
    display: 'inline-block',
  },
  verticalLine: {
    position: 'absolute',
    width: '0',
    borderLeft: '2px solid red',
    marginLeft: '1px'
  },
  marker: {
    width: '4px',
    height: '4px',
    background: 'red'
  }
}

class Cursor extends React.Component {
  state = {
    visible: true,
  };

  constructor(props) {
    super(props);
    this._startBlinking();
  }

  componentWillUnmount() {
    this._stopBlinking();
  }

  _startBlinking() {
    this.blinkInterval = setInterval(::this._toggle, 750);
  }

  _stopBlinking() {
    clearInterval(this.blinkInterval);
  }

  _toggle() {
    this.setState(state => {
      const { visible, ...rest } = state;
      return {
        visible: !visible,
        ...rest,
      }
    })
  }

  render() {
    const { visible } = this.state;
    return (
      <div key='cursor' style={{...styles.root, opacity: visible ? 1: 0}}>
        <div key='vertical_line' style={styles.verticalLine} children={['\uFEFF']}/>
        <div key='marker' style={styles.marker} children={['\uFEFF']}/>
      </div>
    );
  }
}

export default Cursor;
