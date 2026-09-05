import { useState } from "react";
import type { UserType, UserPosition } from "./Data";

type Props = {
  onLogin: (user: UserType) => void;
  onCancel: () => void;
}

const POSITIONS: UserPosition[] = ["Student", "Course Rep", "DOA", "DOI", "Lecturer"];

export function LoginPage({ onLogin, onCancel }: Props){
  const [form, setForm] = useState({ matricNo: "", name: "", position: "Student" as UserPosition, department: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(!form.matricNo.trim() ||!form.name.trim()) return alert("Matric No and Name are required");

    const user: UserType = {
      id: crypto.randomUUID(),
      matricNo: form.matricNo.trim(),
      name: form.name.trim(),
      position: form.position,
      department: form.department.trim() || undefined
    };
    localStorage.setItem("vault_user", JSON.stringify(user));
    onLogin(user);
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">Student Login</h2>
      <p className="text-sm text-gray-500 mb-6">Sign in to upload PDFs. Your position will be shown on your uploads.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required value={form.matricNo} onChange={e=>setForm({...form, matricNo: e.target.value})} placeholder="Matric No e.g. UJ/2022/1234 *" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        <input required value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Full Name e.g. Musa Ahmed *" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        <div>
          <label className="text-sm font-semibold text-gray-700">Position</label>
          <select value={form.position} onChange={e=>setForm({...form, position: e.target.value as UserPosition})} className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none bg-white">
            {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
        <input value={form.department} onChange={e=>setForm({...form, department: e.target.value})} placeholder="Department (optional)" className="w-full px-3 py-2 border rounded-lg" />
        <div className="flex gap-3 pt-2">
          <button type="submit" className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">Sign In</button>
          <button type="button" onClick={onCancel} className="border px-6 py-2 rounded-lg">Cancel</button>
        </div>
      </form>
    </div>
  )
}