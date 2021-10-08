import Handlebars from 'handlebars'
import './error.scss'
import errorTmpl from './error.tmpl';

const data = {
  label: '500',
  text: 'Мы уже фиксим'
}

const error = Handlebars.compile(errorTmpl)

export default error(data)
