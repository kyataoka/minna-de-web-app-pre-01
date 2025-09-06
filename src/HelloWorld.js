import React from 'react';
import './HelloWorld.css';

const HelloWorld = React.memo(() => {
  return (
    <div className="hello-world-container">
      <h1 className="hello-title">Hello World</h1>
      <button className="hover-button">Click me!</button>
    </div>
  );
});

export default HelloWorld;