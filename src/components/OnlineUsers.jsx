import { useCollection } from "../hooks/useCollection";
import { useGlobalContext } from "../hooks/useGlobalContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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
    <div className="hidden h-screen w-64 shrink-0 overflow-x-auto bg-success bg-opacity-10 p-2 pt-10 dark:bg-opacity-20 lg:block">
      <h4 className="mb-5 text-xl font-medium">Users:</h4>
      {documents && (
        <motion.ul
          className="container flex flex-col gap-4"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {sortedDocuments.map((user) => {
            return (
              <motion.li key={user.id} className="item" variants={item}>
                <Link
                  className="text-md btn btn-ghost btn-outline btn-sm btn-block h-auto justify-start px-1 py-2"
                  to={`/user/${user.id}`}
                >
                  <img
                    src={user.photoURL}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <span className="mr-auto block">
                    {user.displayName} {user.id == _user.uid && "(you)"}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`block h-3 w-3 rounded-full ${user.online ? "bg-green-400" : "bg-slate-500"}`}
                    ></span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </div>
  );
}

export default OnlineUsers;
