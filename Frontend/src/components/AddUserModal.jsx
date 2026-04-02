import { useState } from "react";
import { USER_API } from "../api";

const COLOR_OPTIONS = [
  { label: "Blue",   value: "bg-blue-100 text-blue-600",     dot: "bg-blue-400"   },
  { label: "Green",  value: "bg-green-100 text-green-600",   dot: "bg-green-400"  },
  { label: "Red",    value: "bg-red-100 text-red-600",       dot: "bg-red-400"    },
  { label: "Purple", value: "bg-purple-100 text-purple-600", dot: "bg-purple-400" },
  { label: "Amber",  value: "bg-amber-100 text-amber-600",   dot: "bg-amber-400"  },
  { label: "Pink",   value: "bg-pink-100 text-pink-600",     dot: "bg-pink-400"   },
  { label: "Gray",   value: "bg-gray-100 text-gray-500",     dot: "bg-gray-400"   },
];

const generateInitials = (name) => {
  const parts = name.trim().split(" ").filter(Boolean);
  if (!parts.length) return "";
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || "";
  return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
};

export default function AddUserModal({ onClose, refresh }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    initials: "",
    color: COLOR_OPTIONS[0].value,
  });

  const handleSubmit = async () => {
    if (!form.name) return;
    const payload = { ...form, initials: generateInitials(form.name) };
    await fetch(USER_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    refresh();
    onClose();
  };

  const initials = generateInitials(form.name);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl w-100 shadow-2xl overflow-hidden animate-slide-up">

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-7 pt-6 pb-0">
          <h2 className="text-[17px] font-semibold text-gray-900 tracking-tight">
            Add team member
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-7 pt-5 pb-0">

          {/* Live preview */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 mb-5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-mono shrink-0 transition-colors ${form.color}`}>
              {initials || "?"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {form.name || "Full name"}
              </p>
              <p className="text-xs text-gray-400 truncate mt-0.5">
                {form.role || "Role / title"}
              </p>
            </div>
          </div>

          {/* Name */}
          <div className="mb-3">
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Name
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="e.g. Sarah Chen"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Role */}
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
              Role
            </label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-300 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              placeholder="e.g. Product Designer"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
            />
          </div>

          {/* Color swatches */}
          <div className="mb-2">
            <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
              Avatar color
            </label>
            <div className="flex gap-2 flex-wrap">
              {COLOR_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  title={opt.label}
                  onClick={() => setForm({ ...form, color: opt.value })}
                  className={`
                    w-8 h-8 rounded-full transition-all
                    ${opt.dot}
                    ${form.color === opt.value
                      ? "ring-2 ring-offset-2 ring-gray-800 scale-110"
                      : "hover:scale-110 opacity-70 hover:opacity-100"
                    }
                  `}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex justify-end gap-2 px-7 py-5 mt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Save member
          </button>
        </div>
      </div>
    </div>
  );
}