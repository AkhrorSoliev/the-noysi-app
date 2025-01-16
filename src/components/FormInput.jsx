function FormInput({ type, label, size, name, errorText }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-white">{label}</span>
      </div>
      <input
        type={type}
        placeholder="Type here"
        className={`input input-bordered w-full ${size}`}
        name={name}
        required
      />
    </label>
  );
}

export default FormInput;
