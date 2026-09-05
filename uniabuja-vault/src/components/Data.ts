// components/Data.ts
export interface CourseTypes{
    id: string;
    code: string;
    title: string;
    department:string;
    downloadCount: number;
    uploadedBy: string;
    file_key?: string;
    file_name?: string;
}

export const data: CourseTypes[] = [
    {
        id: crypto.randomUUID(),
        code :'GST312',
        title: 'peace and conflict',
        department: 'general',
        downloadCount: 0,
        uploadedBy: 'Admin'
    },
    {
        id: crypto.randomUUID(),
        code :'ENT312',
        title: 'entrepreneurship',
        department: 'general',
        downloadCount: 0,
        uploadedBy: 'Admin'
    }
]