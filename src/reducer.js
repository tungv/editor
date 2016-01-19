import keys from './lib/keys';
import { handleActions } from 'redux-actions';

export const defaultState = {
  content: []
};

const handlers = {
  INSERT(state, {payload}) {
    const last = state.content.slice(-1)[0] || [];
    const initial = state.content.slice(0, -1);
    return {
      ...state,
      content: [
        ...initial,
        last + payload.text
      ]
    }
  },
  NEW_LINE(state) {
    return {
      ...state,
      content: [
        ...state.content,
        ''
      ]
    }
  }
}

const reducer = handleActions(handlers, defaultState);
export default function (state, action) {
  console.log(state, action);
  return reducer(state, action);
}
