import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const JoinCode = props => {
  const [tooltip, setTooltip] = useState('Copy Join Code to Clipboard'); // tooltip text

  // function to copy join code to clipboard
  const copyToClipboard = () => {
    let textArea = document.createElement('textarea');
    textArea.value = props.joincode;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    textArea.setSelectionRange(0, 99999);
    document.execCommand('copy');
    document.body.removeChild(textArea);
    setTooltip('Copied to Clipboard');
  };

  return (
    <Tooltip title={`${tooltip}`}>
      <Button
        type="dashed"
        onClick={copyToClipboard}
        style={{ opacity: '0.8' }}
      >
        <CopyOutlined />
        {props.joincode}
      </Button>
    </Tooltip>
  );
};

export default JoinCode;
