import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// import React from 'react';
// import { createRoot } from 'react-dom/client';  // ← note the change
// import './index.css';
// import App from './App';

// const container = document.getElementById('root');
// const root = createRoot(container);             // ← create a root
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
