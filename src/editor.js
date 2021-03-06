import React from 'react';
import { compose, withReducer, mapProps } from 'recompose';
import reducer, { defaultState } from './reducer';
import keys from './lib/keys';
import Paragraph from './components/Paragraph';

const styles = {
  root: {
    boxSizing: 'border-box',
    width: '100%',
    height: '300px',
    background: 'white',
    border: 'solid 1px black',
    padding: '8px',
    outline: 'none'
  },
  placeholder: {
    color: 'lightgray'
  }
}

const KEY_MAPS = {
  [keys.ENTER]: 'NEW_LINE',
  [keys.LEFT]: 'MOVE_CURSOR',
  [keys.RIGHT]: 'MOVE_CURSOR',
  [keys.UP]: 'MOVE_CURSOR',
  [keys.DOWN]: 'MOVE_CURSOR',
}

function handleKeyDown(e, dispatch) {
  const { keyCode } = e;
  let stop = false;
  if (keyCode === keys.BACKSPACE) {
    stop = true;
    dispatch({
      type: 'DELETE',
      payload: {
        direction: 'LEFT'
      }
    })
  }

  ['LEFT', 'RIGHT', 'UP', 'DOWN'].some(direction => {
    if (keyCode === keys[direction]) {
      dispatch({
        type: 'MOVE_CURSOR',
        payload: {direction}
      });
      return true;
    }
    return false;
  });

  if (stop) {
    e.preventDefault();
    e.stopPropagation();
  }
}

function handleKeyPress(e, dispatch) {
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
  return false;
}

function Editor(props) {
  const {
    state: {
      cursor,
      blocks,
    },
    onKeyPress,
    onKeyDown,
  } = props;

  const isEmpty = !blocks.length || !blocks[0].length;
  const body = isEmpty ?
    <span key="placeholder" style={styles.placeholder}>enter text...</span> :
    blocks.map((block, index) =>
      <Paragraph key={index} content={block} cursor={cursor.blockIndex === index ? cursor : null}/>
    )

  return (
    <section
      tabIndex={1}
      style={styles.root}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      >
      <div key='body'>
        { body }
      </div>
      <pre key='debugger'>
        { JSON.stringify(props.state, null, 2) }
      </pre>
    </section>
  );
}

export default compose(
  withReducer('state', 'dispatch', reducer, defaultState),
  mapProps(({ dispatch, ...rest }) => {
    return {
      onKeyDown: e => handleKeyDown(e, dispatch),
      onKeyPress: e => handleKeyPress(e, dispatch),
      ...rest,
    }
  })
)(Editor);
