import { Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function OnlineUsers() {
  const { documents } = useCollection("users");
  const { user: _user } = useGlobalContext();

  const sortedDocuments = documents
    ? [...documents].sort((a, b) => {
        if (a.id === _user.uid) return -1; // `a` user.uid bilan mos kelsa, yuqoriga chiqadi
        if (b.id === _user.uid) return 1; // `b` user.uid bilan mos kelsa, yuqoriga chiqadi
        if (b.online === a.online) return 0; // Agar online status bir xil bo‘lsa, joy o‘zgarmaydi
        return b.online ? 1 : -1; // Online foydalanuvchilar yuqorida bo‘ladi
      })
    : [];

  return (
    <section className="lg:hidden">
      <div className="align-elements">
        <h2 className="mb-4 text-center text-2xl font-semibold">
          Online Users
        </h2>
        {documents && (
          <motion.ul
            className="gird-cols-1 container grid gap-4 md:grid-cols-2 lg:hidden"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            {sortedDocuments.map((user) => {
              return (
                <motion.li key={user.id} className="item" variants={item}>
                  <Link
                    className="btn btn-ghost btn-outline btn-block h-auto justify-start py-3 text-lg"
                    to={`/user/${user.id}`}
                  >
                    <img
                      src={user.photoURL}
                      alt=""
                      className="h-12 w-12 rounded-full"
                    />
                    <span className="mr-auto">
                      {user.displayName} {user.id == _user.uid && "(you)"}
                    </span>
                    <div className="flex items-center gap-1">
                      <span
                        className={`block h-3 w-3 rounded-full ${user.online ? "bg-green-400" : "bg-slate-500"}`}
                      ></span>
                      <span>{user.online ? "online" : "offline"}</span>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </div>
    </section>
  );
}

export default OnlineUsers;
