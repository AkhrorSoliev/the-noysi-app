function Avatar({ user }) {
  if (!user) {
    return (
      <div className="gap-30 mb-20 flex flex-col items-center">
        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
        <div className="flex flex-col gap-4">
          <h2 className="skeleton text-xl font-semibold"></h2>
        </div>
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
