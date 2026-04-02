import { useEffect, useState } from "react";
import { USER_API } from "../api";
import AddUserModal from "./AddUserModal";

const avatarColorMap = {
  "bg-blue-100 text-blue-600":     "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-600":   "bg-green-100 text-green-700",
  "bg-red-100 text-red-600":       "bg-red-100 text-red-700",
  "bg-purple-100 text-purple-600": "bg-purple-100 text-purple-700",
  "bg-amber-100 text-amber-600":   "bg-amber-100 text-amber-700",
  "bg-pink-100 text-pink-600":     "bg-pink-100 text-pink-700",
  "bg-gray-100 text-gray-500":     "bg-gray-100 text-gray-600",
};

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch(USER_API);
    const data = await res.json();
    setUsers(data.data);
  };

  useEffect(() => { fetchUsers(); }, []);

  const deleteUser = async (id) => {
    await fetch(`${USER_API}/${id}`, { method: "DELETE" });
    fetchUsers();
  };

  const totalTasks = users.reduce((sum, u) => sum + (u.taskCount || 0), 0);

  return (
    <div className="p-7 bg-gray-50 min-h-screen">

      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-[18px] font-medium text-gray-900 tracking-tight">
            Team members
          </h2>
          <p className="text-[13px] text-gray-400 mt-0.5">
            {users.length} member{users.length !== 1 ? "s" : ""} · {totalTasks} tasks total
          </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-1.5 bg-gray-900 hover:bg-gray-700 text-white text-[13px] font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add member
        </button>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white border border-gray-100 rounded-xl px-4 py-3.5 flex items-center justify-between hover:border-gray-200 transition-colors"
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-medium font-mono shrink-0 ${avatarColorMap[u.color] ?? u.color}`}>
                {u.initials}
              </div>
              <div>
                <p className="text-[14px] font-medium text-gray-900 leading-snug">{u.name}</p>
                <p className="text-[12px] text-gray-400 mt-0.5">{u.role}</p>
              </div>
            </div>

            {/* Right */}
            <div className="flex flex-col items-end gap-1.5">
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-600 text-[12px] font-medium px-2.5 py-1 rounded-full">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {u.taskCount} tasks
              </span>
              <button
                onClick={() => deleteUser(u._id)}
                className="text-[12px] text-gray-400 hover:text-red-500 hover:bg-red-50 px-2 py-0.5 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {open && (
        <AddUserModal onClose={() => setOpen(false)} refresh={fetchUsers} />
      )}
    </div>
  );
}