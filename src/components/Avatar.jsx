function Avatar({ user }) {
  if (!user) {
    return (
      <div className="gap-30 mb-20 flex flex-col items-center">
        <div className="loading"></div>
      </div>
    );
  }

  const { displayName, photoURL } = user;
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
