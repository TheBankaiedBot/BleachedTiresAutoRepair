import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
{/*}
import './css/index.css'
*/}
import './css/general.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
