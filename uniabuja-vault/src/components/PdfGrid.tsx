import { CheckCircle, Download, FileText, Eye } from "lucide-react";


export function PdfGrid(){
    return(
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
                <div  className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-linear-to-r from-green-600 to-green-700 text-white p-4">
                    <div className="flex justify-between mb-2">
                      <FileText className="w-8 h-8" />
                      
                        <CheckCircle className="w-5 h-5" />
                      
                    </div>
                    <h3 className="font-bold text-lg line-clamp-2">title</h3>
                  </div>

                  <div className="p-4">
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="font-semibold">Course:</span>
                        <span className="text-green-700 font-semibold">course</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">Department:</span>
                        <span className="text-xs">department</span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 pt-2 border-t">
                        <span>By course Rep</span>
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
                      <button
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              
            </div>
    )
}