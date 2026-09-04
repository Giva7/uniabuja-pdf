import { Search, FileText, CheckCircle, Eye, Download } from 'lucide-react';
import { useState } from 'react';
import type { CourseTypes } from "./Data"

interface searchProps{
    courses: CourseTypes[];
}

export function SearchFunction({courses}: searchProps) {
    const [searchTerm, setSearchTerm] = useState('');

    const cleanSearch = searchTerm.toLowerCase().trim();

    const filteredCourses = cleanSearch === '' 
        ? [] 
        : courses.filter((course) =>
            course.code.toLowerCase().includes(cleanSearch) ||
            course.title.toLowerCase().includes(cleanSearch)
          );

    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search PDFs..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                />
            </div>

            {filteredCourses.map((course: CourseTypes) => {
                return (
                    <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                        <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4">
                            <div className="flex justify-between mb-2">
                                <FileText className="w-8 h-8" />
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-lg line-clamp-2">{course.code}</h3>
                        </div>

                        <div className="p-4">
                            <div className="space-y-2 text-sm mb-4">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Title:</span>
                                    <span className="text-green-700 font-semibold">{course.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-semibold">Department:</span>
                                    <span className="text-xs">{course.department}</span>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                                    <span>Uploaded by: {course.uploadedBy}</span>
                                    <span className="text-white px-2 py-0.5 rounded text-xs bg-gray-500">
                                        New
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <Eye className="w-4 h-4" />
                                    381
                                </span>
                                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold">
                                    <Download className="w-4 h-4" />
                                    Download
                                </button>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>  
    )
}
