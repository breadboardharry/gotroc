import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Toaster } from '@components/ui/sonner';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <>
    <App />
    <Toaster />
  </>
);
