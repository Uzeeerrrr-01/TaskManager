import { TASK_API } from "../api";

const getPriorityStyle = (p) => {
  if (p === "High")   return "bg-red-50 text-red-700";
  if (p === "Medium") return "bg-amber-50 text-amber-700";
  return "bg-green-50 text-green-700";
};

const getPriorityDot = (p) => {
  if (p === "High")   return "bg-red-400";
  if (p === "Medium") return "bg-amber-400";
  return "bg-green-400";
};

const getStatusStyle = (s) => {
  if (s === "open")   return "text-blue-600";
  if (s === "inprog") return "text-violet-600";
  return "text-green-600";
};

const getStatusDot = (s) => {
  if (s === "open")   return "bg-blue-400";
  if (s === "inprog") return "bg-violet-400";
  return "bg-green-400";
};

const formatStatus = (s) => {
  if (s === "inprog") return "In progress";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default function TaskTable({ tasks, refresh, onEdit }) {
  const deleteTask = async (id) => {
    await fetch(`${TASK_API}/${id}`, { method: "DELETE" });
    refresh();
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <table className="w-full border-collapse">

        {/* ── Head ── */}
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100">
            {["Title", "Assignee", "Priority", "Status", "Due", ""].map((h) => (
              <th
                key={h}
                className="px-4 py-2.5 text-left text-[11px] font-medium text-gray-400 uppercase tracking-widest whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody>
          {tasks.map((t) => (
            <tr
              key={t._id}
              className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
            >
              {/* Title */}
              <td className="px-4 py-3 text-[13.5px] font-medium text-gray-900">
                {t.title}
              </td>

              {/* User */}
              <td className="px-4 py-3 text-[13px] text-gray-500">
                {t.user}
              </td>

              {/* Priority */}
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1.5 text-[11.5px] font-medium px-2.5 py-1 rounded-full ${getPriorityStyle(t.priority)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getPriorityDot(t.priority)}`} />
                  {t.priority}
                </span>
              </td>

              {/* Status */}
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1.5 text-[12px] font-medium ${getStatusStyle(t.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${getStatusDot(t.status)}`} />
                  {formatStatus(t.status)}
                </span>
              </td>

              {/* Due */}
              <td className="px-4 py-3 text-[12px] text-gray-400 font-mono">
                {t.due || "—"}
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onEdit(t)}
                    className="text-[12px] font-medium text-gray-400 hover:text-blue-600 hover:bg-blue-50 px-2.5 py-1 rounded-md transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(t._id)}
                    className="text-[12px] font-medium text-gray-400 hover:text-red-600 hover:bg-red-50 px-2.5 py-1 rounded-md transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ── Empty state ── */}
      {tasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-14 text-gray-400">
          <svg className="w-8 h-8 mb-3 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-[13px]">No tasks yet</p>
        </div>
      )}
    </div>
  );
}