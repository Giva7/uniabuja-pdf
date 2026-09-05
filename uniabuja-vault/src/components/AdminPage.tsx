import { useState } from "react";
import { API_URL } from "./api";
import { Check, X, Shield } from "lucide-react";
import type { CourseTypes } from "./Data";

export function AdminPage(){
  const [secret, setSecret] = useState(localStorage.getItem("admin_secret") || "");
  const [pending, setPending] = useState<CourseTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const loadPending = async () => {
    if(!secret){
      setMsg("Enter admin secret first");
      return;
    }
    setLoading(true);
    setMsg("Loading...");
    try{
      const res = await fetch(`${API_URL}/api/pdfs?status=pending`, {
        headers: { Authorization: `Bearer ${secret}` }
      });
      if(!res.ok) throw new Error("Wrong secret - check ADMIN_SECRET in Cloudflare");
      const data = await res.json();
      setPending(data);
      localStorage.setItem("admin_secret", secret);
      setMsg(`${data.length} pending PDFs found`);
    } catch(e){
      setMsg("Failed - wrong secret or worker not deployed");
    } finally {
      setLoading(false);
    }
  }

  const approve = async (id: string) => {
    await fetch(`${API_URL}/api/approve`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
    setPending(p => p.filter(x => x.id !== id));
  }

  const decline = async (id: string, file_key?: string) => {
    if(!confirm("Delete this PDF permanently?")) return;
    await fetch(`${API_URL}/api/decline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({ id, file_key })
    });
    setPending(p => p.filter(x => x.id !== id));
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold flex items-center gap-2 mb-4"><Shield className="w-6 h-6 text-green-700" /> Admin Panel</h1>
          <div className="flex gap-2">
            <input type="password" value={secret} onChange={e=>setSecret(e.target.value)} placeholder="Enter ADMIN_SECRET e.g. uniabuja2026" className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
            <button onClick={loadPending} className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-lg">Load Pending</button>
          </div>
          {msg && <p className="text-sm text-gray-600 mt-2">{msg}</p>}
        </div>

        {loading ? (
          <div className="bg-white p-8 rounded-lg text-center">Loading...</div>
        ) : pending.length === 0 ? (
          <div className="bg-white p-8 rounded-lg text-center text-gray-500">No pending PDFs - upload one from homepage to test</div>
        ) : (
          <div className="grid gap-4">
            {pending.map(c => (
              <div key={c.id} className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
                <div>
                  <div className="font-bold">{c.code} - {c.title}</div>
                  <div className="text-sm text-gray-600">{c.department} | By: {c.uploadedBy}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>approve(c.id)} className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"><Check className="w-4 h-4" />Approve</button>
                  <button onClick={()=>decline(c.id, c.file_key)} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"><X className="w-4 h-4" />Decline</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}