import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user';
import ActionCable from 'actioncable';
import { ActionCableProvider } from 'react-actioncable-provider'
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import './index.css';
import App from './components/App'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import reportWebVitals from './reportWebVitals';

let theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#191970',
      default: '#191970'
    }
  },
})
theme = responsiveFontSizes(theme);
const actionCableUrl = process.env.NODE_ENV === ('development' || 'test') ? 'wss://localhost:3000/cable' : 'wss://backward-jeopardy.herokuapp.com/cable'
const cable = ActionCable.createConsumer(actionCableUrl);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
      <ActionCableProvider cable={cable}>
        <BrowserRouter>
          <UserProvider>
            <App />
          </UserProvider>
        </BrowserRouter>
      </ActionCableProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
