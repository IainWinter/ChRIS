export default [
  {
    id: '1',
    type: 'idle',
    data: { label: 'Finished' },
    position: { x: 250, y: 25 },
    style: { backgroundColor: '#6ede87', color: 'white' },
  },

  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Processing</div> },
    position: { x: 100, y: 125 },
    style: { backgroundColor: '#ff0072', color: 'white' },
  },
  {
    id: '3',
    type: 'started',
    data: { label: 'Started' },
    position: { x: 250, y: 250 },
    style: { backgroundColor: '#6865A5', color: 'white' },
  },
  {
    id: '4',
    type: 'idle',
    data: { label: 'Idle' },
    position: { x: 100, y: 375 },
    style: { backgroundColor: 'grey', color: 'white' },
  },
];
