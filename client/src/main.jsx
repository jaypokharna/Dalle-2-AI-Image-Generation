/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ImagesContextProvider } from './context/ImagesContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <ImagesContextProvider>
    <App />
      </ImagesContextProvider>
   </React.StrictMode>
)
