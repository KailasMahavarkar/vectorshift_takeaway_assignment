import { Position } from 'reactflow';
import { createNode } from './nodeFactory';

const outputNodeConfig = {
  title: 'Output',
  fields: [
    {
      name: 'outputName',
      type: 'text',
      label: 'Name',
      defaultValue: 'output_'
    },
    {
      name: 'outputType',
      type: 'select',
      label: 'Type',
      defaultValue: 'Text',
      options: [
        { value: 'Text', label: 'Text' },
        { value: 'Image', label: 'Image' },
        { value: 'File', label: 'File' }
      ]
    }
  ],
  handles: [
    {
      type: 'target',
      position: Position.Left,
      id: 'value'
    }
  ],
  style: {
    width: 220,
    minHeight: 140
  }
};

export const OutputNode = createNode(outputNodeConfig);
