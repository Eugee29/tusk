import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './store/store'
import { RootCmp } from './root-cmp'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Router>
      <RootCmp />
    </Router>
  </Provider>
)

console.log(
  '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@                       @@@@@@@@@@@@@@\n@@@@@@@@@@                             @@@@@@@@@@@\n@@@@@@@@                                @@@@@@@@@@\n@@@@@@@,    @@@@@@@@    @@@@@@@@         @@@@@@@@@\n@@@@@@@     @@@@@@@@    @@@@@@@@         @@@@@@@@@\n@@@@@@@     @@@@@@@@    @@@@@@@@         @@@@@@@@@\n@@@@@@@     @@@@@@@@                     @@@@@@@@@\n@@@@@@@     @@@@@@@@                     @@@@@@@@@\n@@@@@@@     @@@@@@@@              @@      @@@@@@@@\n@@@@@@@                           @@         @@@@@\n@@@@@@@          @@@@@@@@         @@@@       @@@@@\n@@@@@@@          @@@@@@@@         @@@@@@@&   @@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
)
console.log('TUSK')
console.log('App Repository: https://github.com/Eugee29/tusk-2-frontend')
console.log('Made by:\n')
console.log('Uri Gruda\nhttps://github.com/Eugee29\nhttps://www.linkedin.com/in/uri-gruda-70b36b22b/')
console.log('Eran Avichzer\nhttps://github.com/EranAAA\nhttps://www.linkedin.com/in/eran-avichzer/')
console.log('Tal Ofer\nhttps://github.com/TalAOfer\nhttps://www.linkedin.com/in/tal-ofer-9408b9242/')
