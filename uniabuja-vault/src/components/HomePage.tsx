import { Header} from "./Header"
import { Featured } from "./Featured"
import { SearchFunction } from "./SearchFunction"
import { PdfGrid } from "./PdfGrid"

export function HomePage(){
    return(
        
        <div 
            className="min-h-screen bg-linear-to-br from-green-50 to-blue-50"
        >
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
               <Featured /> 

               <SearchFunction />

               <PdfGrid />

            </main>
        </div>
    
    )
}