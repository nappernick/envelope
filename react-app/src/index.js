import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import Spinner from './components/Loaders/Spinner';

const store = configureStore()

const Root = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
    <Spinner />
  </React.StrictMode>,
  document.getElementById('root')
);
