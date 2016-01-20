import React from 'react';
import Cursor from './Cursor';

function keepSpace(string) {
  return string.split(' ').join('\u2005');
}

export default function Paragraph(props) {
  const { cursor } = props;
  const content = keepSpace(props.content);
  return (<div style={{position: 'relative'}}>
    <div style={{position: 'relative', wordWrap: 'break-word', width: '100%'}}>
      { content || '\u2005' }
    </div>
    { cursor &&
      <div style={{position: 'absolute', top: '0', wordWrap: 'break-word', width: '100%'}}>
        <span style={{visibility: 'hidden'}}>
          { content.slice(0, cursor.characterIndex) }
        </span>
        <Cursor />
      </div>
    }
  </div>);
}
