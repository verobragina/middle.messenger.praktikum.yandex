import Handlebars from 'handlebars'
import errorTmpl from './error.tmpl'
import './error.scss'

const data = {
  label: '404',
  text: 'Не туда попали'
}

const error = Handlebars.compile(errorTmpl)

export default error(data)
