const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        total of {parts.reduce((total, { exercises }) => total + exercises, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

export default Total;
