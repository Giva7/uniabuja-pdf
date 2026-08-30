import { Search } from 'lucide-react';

export function SearchFunction() {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
            type="text"
            placeholder="Search PDFs..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
        />
        </div>

        <div className="grid grid-cols-2 gap-4">
        <select
            className="px-4 py-3 border rounded-lg"
        >
            
            <option>label</option>
            
        </select>

        <select
            className="px-4 py-3 border rounded-lg"
        >
            
            <option>label</option>
            
        </select>
        </div>
    </div>  
)
}