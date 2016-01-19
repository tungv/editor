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

function Cursor(props) {
  return (
    <div style={{position: 'absolute', width: '2px', background: 'red', display: 'inline-block', marginLeft: '1px'}}
      children={['\uFEFF']}
    />
  );
}

function Paragraph(props) {
  const { cursor } = props;
  return (<div style={{position: 'relative'}}>
    <div style={{position: 'relative'}}>{ props.content }</div>
    { cursor &&
      <div style={{position: 'absolute', top: '0'}}>
        <span style={{visibility: 'hidden'}}>
          { props.content.slice(0, cursor.characterIndex + 1) }
        </span>
        <Cursor />
      </div>
    }
  </div>);
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


  return (
    <section
      tabIndex={1}
      style={styles.root}
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      >
    <div>
      {blocks.map((block, index) =>
        <Paragraph key={index} content={block} cursor={cursor.blockIndex === index ? cursor : null}/>
      )}
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
