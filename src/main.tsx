import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import { Provider } from 'react-redux';
import { store } from './Redux/store';
import { HashRouter as Router } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import { loadAppConfig } from './Config/configLoader';

const initApp = async () => {
  await loadAppConfig();
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </StrictMode>,
  );
};

initApp();
