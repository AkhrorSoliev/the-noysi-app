function Avatar({ users }) {
  const { displayName, photoURL } = users;
  return (
    <div className="gap-30 mb-20 flex flex-col items-center">
      <img
        src={photoURL}
        alt={`${displayName} avatar`}
        className="mb-3 h-20 w-20 rounded-full shadow-2xl"
      />
      <h2 className="text-xl font-semibold">Hello, {displayName}</h2>
    </div>
  );
}

export default Avatar;
