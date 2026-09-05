import { useState } from "react";
import { uploadPdf } from "./api";

type Props = {
  onUploadSuccess: () => void;
  onCancel: () => void;
}

export function UploadForm({ onUploadSuccess, onCancel }: Props){
  const [form, setForm] = useState({ code: "", title: "", department: "", uploadedBy: "Admin" });
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!file) return alert("Select a PDF file");
    setLoading(true);
    try{
      await uploadPdf({...form, file });
      onUploadSuccess();
    } catch{
      alert("Upload failed. Check API_URL in api.ts");
    } finally { setLoading(false); }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Upload to Cloudflare R2</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input required value={form.code} onChange={e=>setForm({...form, code: e.target.value})} placeholder="GST312 *" className="w-full px-3 py-2 border rounded-lg" />
        <input required value={form.title} onChange={e=>setForm({...form, title: e.target.value})} placeholder="peace and conflict *" className="w-full px-3 py-2 border rounded-lg" />
        <input required value={form.department} onChange={e=>setForm({...form, department: e.target.value})} placeholder="general *" className="w-full px-3 py-2 border rounded-lg" />
        <input value={form.uploadedBy} onChange={e=>setForm({...form, uploadedBy: e.target.value})} placeholder="Admin" className="w-full px-3 py-2 border rounded-lg" />
        <input required type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.xlsx,.xls" onChange={e=>setFile(e.target.files?.[0]||null)} className="w-full px-3 py-2 border rounded-lg" />
        <div className="flex gap-3"><button disabled={loading} type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">{loading? "Uploading..." : "Upload"}</button><button type="button" onClick={onCancel} className="border px-6 py-2 rounded-lg">Cancel</button></div>
      </form>
    </div>
  )
}