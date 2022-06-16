import "../styles/formInput.css";
const FormInput = (props) => {
  const {
    label,
    onChange,
    errorMessage,
    id,
    pattern,
    badInput,
    ...inputProps
  } = props;

  return (
    <label>
      <div className="label-info">{label}</div>
      <input {...inputProps} onChange={onChange} />
      <span className="error">{badInput && errorMessage}</span>
    </label>
  );
};

export default FormInput;
