import keys from './lib/keys';
import { handleActions } from 'redux-actions';

export const defaultState = {
  blocks: [''],
  cursor: {
    blockIndex: 0,
    characterIndex: 0,
  }
};

export function insertAt(initial, text, position) {
  if (typeof position !== 'number' || position > initial.length) {
    return initial + text;
  }

  const before = initial.substring(0, position);
  const after = initial.substring(position);
  return [before, text, after].join('');
}

export function moveCursor(col, row, direction, blocks) {
  const block = blocks[row];
  const maxInRow = block.length;
  switch (direction) {
    case 'LEFT':
      return {
        col: Math.max(col - 1, 0),
        row: row
      };
    case 'RIGHT':
      return {
        col: Math.min(col + 1, maxInRow),
        row: row
      };
    case 'UP':
      return {
        col: col,
        row: Math.max(row - 1, 0)
      };
    case 'DOWN':
      return {
        col: col,
        row: Math.min(row + 1, blocks.length - 1),
      };
    default:
      return { col, row };
  }
}

const handlers = {
  INSERT(state, {payload}) {
    const {
      cursor: {
        blockIndex,
        characterIndex
      },
      blocks,
    } = state;
    const block = state.blocks[blockIndex];
    const updatedBlock = insertAt(block, payload.text, characterIndex);
    const updatedBlocks = [
      ...blocks.slice(0, blockIndex),
      updatedBlock,
      ...blocks.slice(blockIndex + 1),
    ];

    return {
      ...state,
      blocks: updatedBlocks,
      cursor: {
        ...state.cursor,
        characterIndex: characterIndex + 1
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
  },
  DELETE(state, {payload}) {
    const {
      cursor: {
        blockIndex,
        characterIndex
      }
    } = state;
    let block = state.blocks[blockIndex];
    block = block.substring(0, characterIndex - 1) + block.substring(characterIndex, block.length);

    return {
      ...state,
      blocks: [
        ...state.blocks.slice(0, blockIndex),
        block,
        ...state.blocks.slice(blockIndex + 1)
      ],
      cursor: {
        ...state.cursor,
        characterIndex: Math.max(characterIndex - 1, 0)
      }
    };
  },
  MOVE_CURSOR(state, {payload}) {
    const { direction } = payload;
    const {
      cursor: {
        blockIndex,
        characterIndex
      }
    } = state;

    const { col, row } = moveCursor(characterIndex, blockIndex, direction, state.blocks);

    return {
      ...state,
      cursor: {
        ...state.cursor,
        blockIndex: row,
        characterIndex: col
      }
    };
  }
}

const reducer = handleActions(handlers, defaultState);
export default function (state, action) {
  console.log(state, action);
  return reducer(state, action);
}
