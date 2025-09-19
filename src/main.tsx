import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure this path is correct
import App from './App'; // Make sure this is correct

const root = document.getElementById('root') as HTMLElement;
console.log(root,"root")
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
