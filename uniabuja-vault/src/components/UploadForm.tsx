import { useState } from "react";
import { uploadPdf } from "./api";
import type { UserType } from "./Data";

type Props = {
  user: UserType | null;
  onUploadSuccess: () => void;
  onCancel: () => void;
}

export function UploadForm({ user, onUploadSuccess, onCancel }: Props){
  const [form, setForm] = useState({ code: "", title: "", department: user?.department || "" });
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);

  if(!user){
    return <div className="bg-white p-8 rounded-lg text-center">Please login first to upload.</div>
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!file) return alert("Select a PDF file");
    setLoading(true);
    try{
      await uploadPdf({
       ...form,
        uploadedBy: user.name,
        uploadedByPosition: user.position,
        matricNo: user.matricNo,
        file
      });
      onUploadSuccess();
    } catch{
      alert("Upload failed. Check API_URL in api.ts");
    } finally { setLoading(false); }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-1">Upload to Cloudflare R2</h2>
      <p className="text-sm text-gray-600 mb-6">Uploading as <span className="font-bold text-green-700">{user.name} ({user.position})</span> • {user.matricNo}</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <input required value={form.code} onChange={e=>setForm({...form, code: e.target.value})} placeholder="GST312 *" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        <input required value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="peace and conflict *" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        <input required value={form.department} onChange={e=>setForm({...form, department: e.target.value})} placeholder="general *" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
        <input required type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx,.xls" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full px-3 py-2 border rounded-lg" />
        <div className="flex gap-3"><button disabled={loading} type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50">{loading? "Uploading..." : "Upload"}</button><button type="button" onClick={onCancel} className="border px-6 py-2 rounded-lg">Cancel</button></div>
      </form>
    </div>
  )
}