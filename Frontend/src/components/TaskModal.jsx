import { useState, useEffect } from "react";
import { TASK_API } from "../api";

export default function TaskModal({ onClose, refresh, editTask }) {
    const [form, setForm] = useState({
        title: "",
        desc: "",
        user: "",
        priority: "Medium",
        status: "open",
        due: ""
    });

    useEffect(() => {
        if (editTask) {
            setForm({
                title: editTask.title || "",
                desc: editTask.desc || "",
                user: editTask.user || "",
                priority: editTask.priority || "Medium",
                status: editTask.status || "open",
                due: editTask.due || ""
            });
        } else {
            setForm({
                title: "",
                desc: "",
                user: "",
                priority: "Medium",
                status: "open",
                due: ""
            });
        }
    }, [editTask]);

    const handleSubmit = async () => {
        if (!form.title || !form.user) return;

        try {
            const url = editTask
                ? `${TASK_API}/${editTask._id}`
                : TASK_API;

            const method = editTask ? "PUT" : "POST";

            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form)
            });

            refresh();
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    const inputClass =
        "w-full rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-300 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

    const labelClass =
        "block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1.5";

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="w-full max-w-[460px] rounded-2xl bg-[#FAFAF8] shadow-2xl ring-1 ring-black/5">

                {/* HEADER */}
                <div className="flex items-start justify-between border-b border-gray-100 px-7 pt-7 pb-5">
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                            {editTask ? "Editing Task" : "New Task"}
                        </p>
                        <h2 className="text-xl font-bold text-gray-900">
                            {editTask ? "Update details" : "What needs doing?"}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                {/* BODY */}
                <div className="flex flex-col gap-4 px-7 py-6">

                    {/* TITLE */}
                    <div>
                        <label className={labelClass}>
                            Title <span className="text-red-400">*</span>
                        </label>
                        <input
                            className={inputClass}
                            placeholder="e.g. Review Q3 budget report"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            className={`${inputClass} h-20 resize-none leading-relaxed`}
                            placeholder="Add any context or notes…"
                            value={form.desc}
                            onChange={(e) => setForm({ ...form, desc: e.target.value })}
                        />
                    </div>

                    {/* USER */}
                    <div>
                        <label className={labelClass}>
                            Assignee <span className="text-red-400">*</span>
                        </label>
                        <input
                            className={inputClass}
                            placeholder="e.g. JOHN DOE"
                            value={form.user}
                            onChange={(e) => setForm({ ...form, user: e.target.value })}
                        />
                    </div>

                    {/* PRIORITY + STATUS */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Priority</label>
                            <select
                                className={`${inputClass} cursor-pointer appearance-none`}
                                value={form.priority}
                                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                            >
                                <option value="High">🔴 High</option>
                                <option value="Medium">🟡 Medium</option>
                                <option value="Low">🟢 Low</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Status</label>
                            <select
                                className={`${inputClass} cursor-pointer appearance-none`}
                                value={form.status}
                                onChange={(e) => setForm({ ...form, status: e.target.value })}
                            >
                                <option value="open">○ Open</option>
                                <option value="inprog">◑ In Progress</option>
                                <option value="done">● Done</option>
                            </select>
                        </div>
                    </div>

                    {/* DUE DATE */}
                    <div>
                        <label className={labelClass}>Due Date</label>
                        <input
                            type="date"
                            className={inputClass}
                            value={form.due}
                            onChange={(e) => setForm({ ...form, due: e.target.value })}
                        />
                    </div>

                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end gap-2.5 border-t border-gray-100 px-7 pb-6 pt-4">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-gray-200 bg-transparent px-4 py-2.5 text-sm font-medium text-gray-500 transition hover:bg-gray-50 hover:text-gray-700"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-1.5 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-lg active:translate-y-0"
                    >
                        {editTask ? (
                            <>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Update Task
                            </>
                        ) : (
                            <>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                    <path d="M12 5v14M5 12h14" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                </svg>
                                Save Task
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}