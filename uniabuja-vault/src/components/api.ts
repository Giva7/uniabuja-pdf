export const API_URL = "https://uniabuja-api.ichapijeff.workers.dev";

export async function fetchPdfs(status = "approved") {
  const res = await fetch(`${API_URL}/api/pdfs?status=${status}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function uploadPdf(form: { code: string, title: string, department: string, uploadedBy: string, file: File }) {
  const fd = new FormData();
  fd.append("code", form.code); 
  fd.append("title", form.title);
  fd.append("department", form.department); 
  fd.append("uploadedBy", form.uploadedBy);
  fd.append("file", form.file);
  const res = await fetch(`${API_URL}/api/upload`, { method: "POST", body: fd });
  return res.json();
}

// ADMIN ONLY
export async function fetchPendingPdfs(secret: string) {
  const res = await fetch(`${API_URL}/api/pdfs?status=pending`, {
    headers: { "X-Admin-Secret": secret }
  });
  if (!res.ok) throw new Error("Wrong secret");
  return res.json();
}

export async function approvePdf(id: string, secret: string) {
  const res = await fetch(`${API_URL}/api/pdfs/${id}/approve`, {
    method: "POST",
    headers: { "X-Admin-Secret": secret }
  });
  if (!res.ok) throw new Error("Approve failed");
  return res.json();
}

export async function declinePdf(id: string, secret: string) {
  const res = await fetch(`${API_URL}/api/pdfs/${id}/decline`, {
    method: "POST",
    headers: { "X-Admin-Secret": secret }
  });
  if (!res.ok) throw new Error("Decline failed");
  return res.json();
}