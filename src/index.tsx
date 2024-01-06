import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';

const appEl = document.getElementById('app') as HTMLElement;
const root = createRoot(appEl);

root.render(
  <StrictMode>
    <App/>
  </StrictMode>
);
