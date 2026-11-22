const Button = ({ onClick, feedback }) => {
  return <button onClick={onClick}>{feedback}</button>;
};

export default Button;
