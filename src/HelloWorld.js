import React from 'react';
import Button from './components/Button';
import './HelloWorld.css';

const HelloWorld = React.memo(() => {
  return (
    <div className="hello-world-container">
      <h1 className="hello-title">Hello World</h1>
      <Button variant="primary" className="hover-button">
        Click me!
      </Button>
    </div>
  );
});

export default HelloWorld;