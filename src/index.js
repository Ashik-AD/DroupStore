import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import SignupProvider from './context/SignupProvider';
import CountProvider from './context/CountProvider';
import UserProvider from './context/UserProvider';
import UserItemProvider from './context/UserItemProvider';
ReactDOM.render(
  <React.StrictMode>
    <SignupProvider>
      <UserProvider>
        <UserItemProvider>
          <CountProvider>
            <App />
          </CountProvider>
        </UserItemProvider>
      </UserProvider>
    </SignupProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
