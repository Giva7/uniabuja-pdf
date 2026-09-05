import { Upload, Users, Download, FileText, LogIn, LogOut } from "lucide-react"
import type { CourseTypes, UserType } from "./Data"

type Props = {
  activeView: 'explore' | 'upload' | 'login';
  setActiveView: (v: 'explore' | 'upload' | 'login') => void;
  courses: CourseTypes[];
  user: UserType | null;
  onLogout: () => void;
  onUploadClick: () => void;
}

export function Header({ activeView, setActiveView, courses, user, onLogout, onUploadClick }: Props){
    const totalDownloads = courses.reduce((sum, c) => sum + (c.downloadCount || 0), 0);
    return(
        <header className="bg-linear-to-r from-green-700 to-green-800 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl font-bold">UNIABUJA VAULT</h1>
                        <p className="text-green-100 text-sm">Community Learning Platform</p>
                    </div>
                    <div className="text-right">
                        {user? (
                            <div className="bg-white/10 rounded-lg px-3 py-2">
                                <div className="text-sm font-bold">{user.name}</div>
                                <div className="text-xs text-green-100">{user.matricNo} • {user.position}</div>
                                <button onClick={onLogout} className="mt-1 flex items-center gap-1 text-xs bg-white/20 hover:bg-white/30 px-2 py-1 rounded ml-auto"><LogOut className="w-3 h-3" />Logout</button>
                            </div>
                        ) : (
                            <button onClick={() => setActiveView('login')} className="flex items-center gap-2 bg-white text-green-800 px-4 py-2 rounded-lg font-semibold text-sm"><LogIn className="w-4 h-4" />Login</button>
                        )}
                    </div>
                </div>
                <div className="flex gap-2 mb-6">
                    <button onClick={() => setActiveView('explore')} className={`px-4 py-2 rounded-lg font-semibold ${activeView === 'explore'? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'}`}>Explore</button>
                    <button onClick={onUploadClick} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${activeView === 'upload'? 'bg-white text-green-800' : 'bg-white/10 hover:bg-white/20'}`}><Upload className="w-4 h-4" />Upload</button>
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