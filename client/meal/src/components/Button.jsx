import PropTypes from 'prop-types';
import './styles/Button.css';

const Button = ({ text, onClick, className, disabled, type = 'button' }) => {
  const buttonClass = `button ${className || ''}`;  
  return (
    <button 
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
};

export default Button;
