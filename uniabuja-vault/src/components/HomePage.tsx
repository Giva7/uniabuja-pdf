import { Header} from "./Header"
import { Featured } from "./Featured"
import { SearchFunction } from "./SearchFunction"
import { PdfGrid } from "./PdfGrid"
import { UploadForm } from "./UploadForm"
import { useState, useEffect } from "react";
import { data } from "./Data"
import type { CourseTypes } from "./Data"
import { API_URL, fetchPdfs } from "./api"

export function HomePage(){
    const [courses, setCourses] = useState<CourseTypes[]>(data);
    const [activeView, setActiveView] = useState<'explore' | 'upload'>('explore');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      fetchPdfs().then(remote => {
        if(remote && remote.length > 0) setCourses(remote);
      }).catch(()=>{}).finally(()=>setLoading(false));
    }, []);

    const handleDownload = (course: CourseTypes) => {
      if(course.file_key){
        window.open(`${API_URL}/api/file/${course.file_key}`, "_blank");
      }
      setCourses(prev => prev.map(c => c.id === course.id? {...c, downloadCount: c.downloadCount + 1} : c));
    }

    const refresh = async () => {
      try{ const remote = await fetchPdfs(); if(remote.length) setCourses(remote); } catch{Error}
      setActiveView('explore');
    }

    return(
        <div className="min-h-screen bg-linear-to-br from-green-50 to-blue-50">
            <Header activeView={activeView} setActiveView={setActiveView} courses={courses} />
            <main className="max-w-7xl mx-auto px-4 py-8">
              {loading? <div className="bg-white p-8 rounded-lg text-center">Loading from R2...</div> : activeView === 'explore'? (
                <>
                  <Featured courses={courses} onDownload={handleDownload} />
                  <SearchFunction searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                  <PdfGrid courses={courses} searchTerm={searchTerm} onDownload={handleDownload} />
                </>
              ) : (
                <UploadForm onUploadSuccess={refresh} onCancel={() => setActiveView('explore')} />
              )}
            </main>
        </div>
    )
}