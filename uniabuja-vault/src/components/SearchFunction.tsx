import { Search } from 'lucide-react';

export function SearchFunction({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (v:string)=>void }) {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Search PDFs by code or title..." className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none" />
            </div>
        </div>
    )
}