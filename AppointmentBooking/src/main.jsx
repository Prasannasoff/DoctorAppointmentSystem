import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
 // <React.StrictMode>
    <App />
 // </React.StrictMode>,
)


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App.jsx';
// import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './redux/userSlice';

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     // Add other reducers if you have them
//   },
// });

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root')
// );
