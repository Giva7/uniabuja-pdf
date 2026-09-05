import { TrendingUp, Star } from "lucide-react";
import type { CourseTypes } from "./Data";

type Props = {
  courses: CourseTypes[];
  onDownload: (course: CourseTypes) => void;
}

export function Featured({ courses, onDownload }: Props){
    const popular = [...courses].sort((a,b) => b.downloadCount - a.downloadCount).slice(0,3);
    return(
        <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-700" />Most Popular
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {popular.map(course => (
                <div key={course.id} className="bg-linear-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">✓ Verified</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                  <div className="text-sm text-gray-600 mb-2">{course.code}</div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{course.downloadCount} downloads</span>
                    <button onClick={() => onDownload(course)} className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Download</button>
                  </div>
                </div>
              ))}
            </div>
        </div>
    )
}