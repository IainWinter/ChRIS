import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ data }) => {
  return (
    <div>
      <Handle type="source" position="right" id="a" />
      <div>{data.label}</div>
      <Handle type="target" position="left" id="b" />
    </div>
  );
};

export default CustomNode;
