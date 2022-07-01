import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import Routes from './routes'
import { RecoilRoot } from 'recoil'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Routes />
    </RecoilRoot>
  </React.StrictMode>
)
