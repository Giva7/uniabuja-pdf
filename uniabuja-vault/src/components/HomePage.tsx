import { Header} from "./Header"
import { Featured } from "./Featured"
import { SearchFunction } from "./SearchFunction"
import { PdfGrid } from "./PdfGrid"
import { useState } from "react";
import { data } from "./Data"
import type { CourseTypes } from "./Data"

export function HomePage(){
    const [courses, setCourses] = useState<CourseTypes[]>(data);
    return(
        
        <div 
            className="min-h-screen bg-linear-to-br from-green-50 to-blue-50"
        >
            <Header />

            <main className="max-w-7xl mx-auto px-4 py-8">
               <Featured /> 

               <SearchFunction  courses={courses} />

               <PdfGrid courses ={courses} />

            </main>
        </div>
    
    )
}