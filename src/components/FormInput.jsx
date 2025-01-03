import { useState, useEffect } from "react";

function FormInput({ type, label, errorText }) {
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (value.length > 3) {
      setHasError(false);
    }
  }, [value]);

  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder="Type here"
        className={`input input-bordered w-full ${
          hasError ? "input-error" : ""
        }`}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (e.target.value.length <= 3) {
            setHasError(true);
          }
        }}
      />
      <div className="label">
        <span className="label-text-alt">{hasError ? errorText : ""}</span>
      </div>
    </label>
  );
}

export default FormInput;
