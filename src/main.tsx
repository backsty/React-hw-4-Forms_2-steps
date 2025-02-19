import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@css/index.css';
import '@css/components/WorkoutForm.css';
import '@css/components/WorkoutItem.css';
import '@css/components/WorkoutList.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
