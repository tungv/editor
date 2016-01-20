import React from 'react';

export default function Cursor(props) {
  return (
    <div style={{position: 'absolute', width: '2px', background: 'red', display: 'inline-block', marginLeft: '1px'}}
      children={['\uFEFF']}
    />
  );
}
