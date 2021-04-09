import "../less/button.css";

const Button = ({ btnText, handleButtonClick }) => {
  return (
    <button className="btnDefault" onClick={handleButtonClick}>
      {btnText}
    </button>
  );
};

export default Button;
