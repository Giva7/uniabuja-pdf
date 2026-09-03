
export interface CourseTypes{
    key: string;
    code: string;
    title: string;
    department:string;
    downloadCount: number;
    uploadedBy: string;

}



export const data: CourseTypes[] = [
    {
        key: crypto.randomUUID(),
        code :'GST312',
        title: 'peace and conflict',
        department: 'general',
        downloadCount: 0,
        uploadedBy: 'Admin'
    },
    {
        key: crypto.randomUUID(),
        code :'ENT312',
        title: 'entrepreneurship',
        department: 'general',
        downloadCount: 0,
        uploadedBy: 'Admin'
    }
]