import PropTypes from 'prop-types'
import styles from './button.module.scss'

const Button = ({ children, onToggleEditMode, color, name }) => {
  return (
    <button className={styles[color]} data-name={name} onClick={onToggleEditMode} type='button'>
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onToggleEditMode: PropTypes.func,
  name: PropTypes.string,
  color: PropTypes.string,
}

export default Button
