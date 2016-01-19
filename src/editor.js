import React from 'react';
import { compose, withReducer, mapProps } from 'recompose';
import reducer, { defaultState } from './reducer';
import keys from './lib/keys';

const styles = {
  root: {
    width: '100%',
    height: '300px',
    background: 'lightgray'
  }
}

const KEY_MAPS = {
  [keys.ENTER]: 'NEW_LINE'
}

function handleKey(e, dispatch) {
  const { shiftKey, charCode } = e;
  const action = KEY_MAPS[charCode] ? {
    type: KEY_MAPS[charCode]
  } : {
    type: 'INSERT',
    payload: {
      text: String.fromCharCode(charCode)
    }
  };

  dispatch(action);
}

function editor(props) {
  const {
    state,
    onKeyPress,
  } = props;

  return (
    <section
      tabIndex={1}
      style={styles.root}
      onKeyPress={onKeyPress}
      >
    <div>
      {state.content.map((p, index) =>
        <p key={index}>{ p }</p>
      )}
    </div>
    </section>
  );
}

export default compose(
  withReducer('state', 'dispatch', reducer, defaultState),
  mapProps(({ dispatch, ...rest }) => {
    return {
      onKeyPress: e => handleKey(e, dispatch),
      ...rest,
    }
  })
)(editor);
