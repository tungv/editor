import React from 'react';
import { compose, withState, mapProps } from 'recompose';
import keys from './lib/keys';

const styles = {
  root: {
    width: '100%',
    height: '300px',
    background: 'lightgray'
  }
}

const KEY_MAPS = {
  [keys.ENTER]: '\n'
}

function handleKey(e) {
  const { shiftKey, charCode } = e;
  return KEY_MAPS[charCode] || String.fromCharCode(charCode);
}

function editor(props) {
  const {
    text,
    onKeyPress,
  } = props;

  return (
    <section
      tabIndex={1}
      style={styles.root}
      onKeyPress={onKeyPress}
      >
    <div>{ text }</div>
    </section>
  );
}

export default compose(
  withState('text', 'setText', ''),
  mapProps(({ setText, ...rest }) => {
    return {
      onKeyPress: e => {
        const char = handleKey(e);
        setText(t => (console.log(t.length, t), t + char));
      },
      ...rest,
    }
  })
)(editor);
