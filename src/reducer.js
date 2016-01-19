import keys from './lib/keys';
import { handleActions } from 'redux-actions';

export const defaultState = {
  blocks: [],
  cursor: {
    blockIndex: 0,
    characterIndex: 0,
  }
};

const handlers = {
  INSERT(state, {payload}) {
    const last = state.blocks.slice(-1)[0] || [];
    const initial = state.blocks.slice(0, -1);
    const updatedLast = last + payload.text;
    const blocks = [
      ...initial,
      updatedLast,
    ];

    return {
      ...state,
      blocks,
      cursor: {
        ...state.cursor,
        blockIndex: blocks.length - 1,
        characterIndex: updatedLast.length - 1,
      }
    }
  },
  NEW_LINE(state) {
    return {
      ...state,
      blocks: [
        ...state.blocks,
        ''
      ],
      cursor: {
        ...state.cursor,
        blockIndex: state.blocks.length,
        characterIndex: 0,
      }
    }
  }
}

const reducer = handleActions(handlers, defaultState);
export default function (state, action) {
  console.log(state, action);
  return reducer(state, action);
}
