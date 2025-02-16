import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { MealProvider } from './context/MealProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MealProvider>
        <App />
      </MealProvider>
    </BrowserRouter>
  </React.StrictMode>
)
