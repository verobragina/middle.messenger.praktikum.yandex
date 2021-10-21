import login from './pages/login/login'
import registration from './pages/registration/registration'
import profile from './pages/profile/profile'
import chats from './pages/chats/chats'
import error404 from './pages/error/error-404'
import error500 from './pages/error/error-500'

import './scss/styles.scss'

const output = document.querySelector('#output')

window.addEventListener('hashchange', () => {
  const hash = window.location.hash;

  switch(hash) {
    case '#login':
      output.innerHTML = login
      break
    case '#registration':
      output.innerHTML = registration
      break
    case '#profile':
      output.innerHTML = profile
      break
    case '#chats':
      output.innerHTML = chats
      break
    case '#error404':
      output.innerHTML = error404
      break
    case '#error500':
      output.innerHTML = error500
      break
    default:
      output.innerHTML = error404
  }
});
