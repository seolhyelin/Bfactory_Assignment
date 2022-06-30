import PropTypes from 'prop-types'
import styles from './button.module.scss'

const Button = ({ children }) => {
  return <button type='button'>{children}</button>
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Button
