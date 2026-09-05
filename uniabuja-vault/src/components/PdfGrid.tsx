import { CheckCircle, Download, FileText, Eye } from "lucide-react";
import type { CourseTypes } from "./Data"

type Props = {
  courses: CourseTypes[];
  searchTerm: string;
  onDownload: (course: CourseTypes) => void;
}

export function PdfGrid({ courses, searchTerm, onDownload }: Props){
    const clean = searchTerm.toLowerCase().trim();
    const filtered = clean === ''? courses : courses.filter(c => c.code.toLowerCase().includes(clean) || c.title.toLowerCase().includes(clean));
    if(filtered.length === 0) return <div className="bg-white rounded-lg p-8 text-center text-gray-500">No results for "{searchTerm}"</div>

    return(
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((course) => (
              <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4">
                    <div className="flex justify-between mb-2"><FileText className="w-8 h-8" /><CheckCircle className="w-5 h-5" /></div>
                    <h3 className="font-bold text-lg">{course.code}</h3>
                  </div>
                  <div className="p-4">
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between"><span className="font-semibold">Title:</span><span className="text-green-700 font-semibold text-right ml-2">{course.title}</span></div>
                      <div className="flex justify-between"><span className="font-semibold">Department:</span><span className="text-xs text-right ml-2">{course.department}</span></div>
                      <div className="flex flex-col gap-1 text-xs text-gray-600 pt-2 border-t">
                        <div className="flex justify-between items-center">
                          <span>By: {course.uploadedBy}</span>
                          {course.uploadedByPosition && <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text- font-bold border border-green-200">{course.uploadedByPosition}</span>}
                        </div>
                        {course.uploaderMatricNo && <span className="text- text-gray-400">{course.uploaderMatricNo}</span>}
                      </div>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="text-xs text-gray-500 flex items-center gap-1"><Eye className="w-4 h-4" />{course.downloadCount}</span>
                      <button onClick={() => onDownload(course)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"><Download className="w-4 h-4" />Download</button>
                    </div>
                  </div>
                </div>
            ))}
            </div>
    )
}