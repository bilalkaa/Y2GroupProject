import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from './store'

ReactDOM.render(
  <BrowserRouter>
    <Provider {...store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)