import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import Routes from './routes'
import Header from './routes/components/Header'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Header />
    <Routes />
  </React.StrictMode>
)
