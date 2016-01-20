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
  [keys.ENTER]: 'NEW_LINE'
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
