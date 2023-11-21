import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import '/src/styles.scss';

import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './authConfig.ts';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const mainInstance = new PublicClientApplication(msalConfig);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <MsalProvider instance={mainInstance}>
      <App />
      <ToastContainer position='bottom-left' style={{ fontSize: '0.5rem' }} />
    </MsalProvider>
  </Provider>
)
