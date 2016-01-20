import React from 'react';
import Cursor from './Cursor';

export default function Paragraph(props) {
  const { cursor } = props;
  return (<div style={{position: 'relative'}}>
    <div style={{position: 'relative', wordWrap: 'break-word', width: '100%'}}>{ props.content }</div>
    { cursor &&
      <div style={{position: 'absolute', top: '0', wordWrap: 'break-word', width: '100%'}}>
        <span style={{visibility: 'hidden'}}>
          { props.content.slice(0, cursor.characterIndex + 1) }
        </span>
        <Cursor />
      </div>
    }
  </div>);
}
