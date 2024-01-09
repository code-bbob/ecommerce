import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@coreui/coreui/dist/css/coreui.css';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
)
