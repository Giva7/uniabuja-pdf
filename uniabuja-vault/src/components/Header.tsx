import { Upload, Users, Download, FileText } from "lucide-react"
import type { CourseTypes } from "./Data"

type Props = {
  activeView: 'explore' | 'upload';
  setActiveView: (v: 'explore' | 'upload') => void;
  courses: CourseTypes[];
}

export function Header({ activeView, setActiveView, courses }: Props){
    const totalDownloads = courses.reduce((sum, c) => sum + (c.downloadCount || 0), 0);
    return(
        <header className="bg-linear-to-r from-green-700 to-green-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="mb-4">
                    <h1 className="text-3xl font-bold">UNIABUJA VAULT</h1>
                    <p className="text-green-100 text-sm">Community Learning Platform</p>
                </div>
                <div className="flex gap-2 mb-6">
                    <button onClick={() => setActiveView('explore')} className={`px-4 py-2 rounded-lg font-semibold ${activeView === 'explore'? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'}`}>Explore</button>
                    <button onClick={() => setActiveView('upload')} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${activeView === 'upload'? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'}`}><Upload className="w-4 h-4" />Upload</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-lg p-3 text-center"><Users className="w-5 h-5 mx-auto mb-1" /><div className="text-xl font-bold">500</div><div className="text-xs text-green-100">Students</div></div>
                    <div className="bg-white/10 rounded-lg p-3 text-center"><Download className="w-5 h-5 mx-auto mb-1" /><div className="text-xl font-bold">{totalDownloads}</div><div className="text-xs text-green-100">Downloads</div></div>
                    <div className="bg-white/10 rounded-lg p-3 text-center"><FileText className="w-5 h-5 mx-auto mb-1" /><div className="text-xl font-bold">{courses.length}</div><div className="text-xs text-green-100">PDFs</div></div>
                </div>
            </div>
        </header>
    )
}