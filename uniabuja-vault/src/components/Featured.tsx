import { TrendingUp, Star } from "lucide-react";


export function Featured(){
    return(
        <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-700" />
                  Most Popular
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                    <div className="bg-linear-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-lg p-4">
                      <div className="flex justify-between mb-2">
                        <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                        
                          <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">✓ Verified</span>
                        
                      </div>
                      <h3 className="font-bold text-gray-800 mb-1 line-clamp-2">title</h3>
                      <div className="text-sm text-gray-600 mb-2">course</div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">38 downloads</span>
                        <button
                          className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                        >
                          Download
                        </button>
                      </div>
                    </div>
                 
                </div>
              </div>
    )

}