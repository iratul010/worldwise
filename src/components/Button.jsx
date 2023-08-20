 import styles from './Button.module.css'
import PropTypes from 'prop-types';

function Button({ children, onClick, type }) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type:PropTypes.string.isRequired
//   type: PropTypes.oneOf(['primary', 'secondary']).isRequired, // Adjust possible values as needed
};

export default Button;
