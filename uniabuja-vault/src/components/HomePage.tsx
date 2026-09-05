import { Header} from "./Header"
import { Featured } from "./Featured"
import { SearchFunction } from "./SearchFunction"
import { PdfGrid } from "./PdfGrid"
import { UploadForm } from "./UploadForm"
import { LoginPage } from "./LoginPage"
import { useState, useEffect } from "react";
import { data } from "./Data"
import type { CourseTypes, UserType } from "./Data"
import { API_URL, fetchPdfs } from "./api"

export function HomePage(){
    const [courses, setCourses] = useState<CourseTypes[]>(data);
    const [activeView, setActiveView] = useState<'explore' | 'upload' | 'login'>('explore');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<UserType | null>(null);
    const [pendingAction, setPendingAction] = useState<'upload' | null>(null);

    useEffect(() => {
      const saved = localStorage.getItem("vault_user");
      if(saved){
        try{ setUser(JSON.parse(saved)); } catch{}
      }
      fetchPdfs().then(remote => {
        if(remote && remote.length > 0) setCourses(remote);
      }).catch(()=>{}).finally(()=>setLoading(false));
    }, []);

    const handleLogin = (newUser: UserType) => {
      setUser(newUser);
      if(pendingAction === 'upload'){
        setActiveView('upload');
      } else {
        setActiveView('explore');
      }
      setPendingAction(null);
    }

    const handleLogout = () => {
      localStorage.removeItem("vault_user");
      setUser(null);
      setActiveView('explore');
    }

    const handleUploadClick = () => {
      if(!user){
        setPendingAction('upload');
        setActiveView('login');
      } else {
        setActiveView('upload');
      }
    }

    const handleDownload = async (course: CourseTypes) => {
      try {
        if(course.file_key){
          const res = await fetch(`${API_URL}/api/file/${course.file_key}`);
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = course.file_name || `${course.code}.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }
      } catch {
        if(course.file_key) window.open(`${API_URL}/api/file/${course.file_key}`, "_blank");
      }
      setCourses(prev => prev.map(c => c.id === course.id? {...c, downloadCount: c.downloadCount + 1} : c));
    }

    const refresh = async () => {
      try{ const remote = await fetchPdfs(); if(remote.length) setCourses(remote); } catch{/* ignore */}
      setActiveView('explore');
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50">
            <Header activeView={activeView} setActiveView={setActiveView} courses={courses} user={user} onLogout={handleLogout} onUploadClick={handleUploadClick} />
            <main className="max-w-7xl mx-auto px-4 py-8">
              {activeView === 'login'? (
                <LoginPage onLogin={handleLogin} onCancel={() => { setPendingAction(null); setActiveView('explore'); }} />
              ) : loading? (
                <div className="bg-white p-8 rounded-lg text-center">Loading from R2...</div>
              ) : activeView === 'explore'? (
                <>
                  <Featured courses={courses} onDownload={handleDownload} />
                  <SearchFunction searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <PdfGrid courses={courses} searchTerm={searchTerm} onDownload={handleDownload} />
                </>
              ) : (
                <UploadForm user={user} onUploadSuccess={refresh} onCancel={() => setActiveView('explore')} />
              )}
            </main>
        </div>
    )
}