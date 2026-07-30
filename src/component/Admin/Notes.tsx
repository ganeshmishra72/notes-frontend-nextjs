"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { NotebookIcon, Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import Authstore from '@/store/AuthStore'
import { useQuery } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useCourse, useDeleteCourse, useUpdateCourse } from '@/hooks/Coursehook'
import { getNotes } from '@/service/NotesService'
import { getAllBranche, getAllCourses, getALLSemester, getAllSubject, getAllUniversity } from '@/util/UniversityService'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useCreateNotes, useDeleteNotes, useUpdateNotesStatus } from '@/hooks/Noteshooks'
import { useUpdateUserStatus } from '@/hooks/Userhook'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'


interface Notes {
  id: string;

  title: string;
  description: string;

  fileUrl: string;

  thumblineUrl: string;
  fileType: string;
  fileSize: string;
  language: string;

  universityId: string;

  semesterId: string;

  subjectId: string;

  courseId: string;

  branchId: string;
  downloadCount: 0;
  status: string;
  viewCount: 0;
  createdAt: string;
  updatedAt: string;
}

 
const Course = () => {
  const [open, setOpen] = useState(false);
  const { mutate } = useCreateNotes()
  const { mutate: updateCourseDetails } = useUpdateCourse()
  const { mutate: deleteNotes } = useDeleteNotes()
  const {mutate:updateStatus}=useUpdateNotesStatus()
  const [editNotes, setEditNotes] = useState<Notes | null>(null);
  const [universityId,setUniversityId]=useState(null)
  const token = Authstore(s => s.accessToken)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  
  const formik = useFormik({
    initialValues: { id: "", title:"",description:"",fileUrl:"",fileSize:"",language:"",universityId:"",semesterId:"",subjectId:"",courseId:"",branchId:"",downloadCount:"",status:"" , file: null as File | null},
    onSubmit: (values) => {
      if (editNotes) {

        // updateCourseDetails({ courseId: values.id, updateCourseData: values })
        // setOpen(false)
      }
      else {
        // mutate(values)
        console.log(values);
        const formData=new FormData();
         formData.append("title", values.title);
    formData.append("universityId", values.universityId);
    formData.append("semesterId", values.semesterId);
    formData.append("subjectId", values.subjectId);
    formData.append("courseId", values.courseId);
    formData.append("branchId", values.branchId);
        
      // formData.append("uploadedBy", user.id); // header

       if (values.file) {
      formData.append("file", values.file);
    }
          mutate(formData)
        setOpen(false)
        formik.resetForm()
      }

    }
  })
  // const handleEdit = (course: Course) => {
  //   setEditCourse(course);

  //   formik.setValues({

  //     id: course.id,
  //     coursedName: course.coursedName,
  //     description: course.description,
  //     universityId: course.universityId

  //   });
  // };

  const handelDelete = (notesId: string) => {
   deleteNotes(notesId)
  }

  const handelUpdateStatus=(notesId:any,status:any)=>{
         updateStatus({notesId:notesId,status:status})
  }
  const {data:university}=getAllUniversity()
  const {data:branch}=getAllBranche()
  const {data:subject}=getAllSubject()
  const {data:semester}=getALLSemester()
  const {data:course}=getAllCourses()
  const universityMap = React.useMemo(() => {
  return (
    university?.reduce((acc: any, university: any) => {
      acc[university.id] = university.universityName;
      return acc;
    }, {}) || {}
  );
}, [university]);

  const branchMap = React.useMemo(() => {
  return (
    branch?.reduce((acc: any, branch: any) => {
      acc[branch.id] = branch.branchName;
      return acc;
    }, {}) || {}
  );
}, [branch]);

  const subjectMap = React.useMemo(() => {
  return (
    subject?.reduce((acc: any, subject: any) => {
      acc[subject.id] = subject.name;
      return acc;
    }, {}) || {}
  );
}, [subject]);

  const semesterMap = React.useMemo(() => {
  return (
    semester?.reduce((acc: any, semester: any) => {
      acc[semester.id] = semester.semesterName;
      return acc;
    }, {}) || {}
  );
}, [semester]);

  const courseMap = React.useMemo(() => {
  return (
    course?.reduce((acc: any, course: any) => {
      acc[course.id] = course.coursedName;
      return acc;
    }, {}) || {}
  );
}, [course]);


  const isEditMode = editNotes !== null;
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <NotebookIcon className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Notes
              </h1>
              <p className="text-slate-500 mt-1">
                Manage all Note available in the platform.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setOpen(true), setEditNotes(null), formik.resetForm() }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          <Plus size={20} />
          Add Notes
        </motion.button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-white">Tile </TableHead>
              <TableHead className="text-white">Description </TableHead>
              <TableHead className="text-white">File URL</TableHead>
              <TableHead className="text-white">File Size</TableHead>
              <TableHead className="text-white">University Name</TableHead>
              <TableHead className="text-white">Semester</TableHead>
              <TableHead className="text-white">Subject</TableHead>
              <TableHead className="text-white">Course Name</TableHead>
              <TableHead className="text-white">Branch Name</TableHead>
              <TableHead className="text-white">Download Count </TableHead>
              <TableHead className="text-white">Status </TableHead>
              <TableHead className="text-white text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            )}

            {isError && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-red-500">
                  Failed to load notes
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No notes found
                </TableCell>
              </TableRow>
            )}

            {data?.map((notes: any) => (
              <TableRow key={notes.id}>
                <TableCell>{notes.title}</TableCell>
                <TableCell>{notes.description}</TableCell>
                <TableCell>{notes.fileUrl}</TableCell>
                <TableCell>{notes.fileSize}</TableCell>
                <TableCell>
                  {universityMap[notes.universityId || "-"]}
                </TableCell>
                <TableCell>{semesterMap[notes.semesterId || "-"]}</TableCell>
                <TableCell>{subjectMap[notes.subjectId || "-"]}</TableCell>
                <TableCell>{courseMap[notes.courseId || "-"]}</TableCell>
                <TableCell>{branchMap[notes.branchId || "-"]}</TableCell>
                <TableCell>{notes.downloadCount}</TableCell>
              <TableCell>
  <Select
    value={notes.status}
    onValueChange={(value) => handelUpdateStatus(notes.id, value)}
  >
    <SelectTrigger
      className={`w-[150px]
      ${
        notes.status === "APPROVED"
          ? "border-green-500 text-green-700"
          : notes.status === "REJECTED"
          ? "border-red-500 text-red-700"
          : "border-yellow-500 text-yellow-700"
      }`}
    >
      <SelectValue />
    </SelectTrigger>

    <SelectContent>
      <SelectItem value="PENDING">Pending</SelectItem>
      <SelectItem value="APPROVED">Approved</SelectItem>
      <SelectItem value="REJECTED">Rejected</SelectItem>
    </SelectContent>
  </Select>
</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      // onClick={() => { handleEdit(course), setOpen(true) }}
                      className="text-slate-600 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handelDelete(notes.id)}
                      className="text-slate-600 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>


      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
              <NotebookIcon /> Add Notes
            </DialogTitle>
          </DialogHeader>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4" onSubmit={formik.handleSubmit}>

            <div className="space-y-4  w-full">
              <Label>Title</Label>
              <Input name="title" value={formik.values.title} onChange={formik.handleChange} />
            </div>



            <div className="space-y-4 w-full">
              <Label >Description</Label>
              <Input name="description" value={formik.values.description} onChange={formik.handleChange} />
            </div>

            <div className="space-y-4 w-full">
              <Label>University</Label>
               <select name="universityId" className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700" value={formik.values.universityId} onChange={formik.handleChange}>
                 <option >Select University</option>
                {university?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.universityName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4 w-full">
              <Label>Semester</Label>
               <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700"  name="semesterId" value={formik.values.semesterId} onChange={formik.handleChange}>
                 <option >Select Semester</option>
                {semester?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.semesterName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4 w-full">
              <Label>Subject</Label>
               <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700"  name="subjectId" value={formik.values.subjectId} onChange={formik.handleChange}>
                 <option >Select Subject</option>
                {subject?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4 w-full">
              <Label>Course</Label>
               <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700"  name="courseId" value={formik.values.courseId} onChange={formik.handleChange}>
                 <option >Select Course</option>
                {course?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.coursedName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4 w-full">
              <Label>Branch</Label>
               <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700"  name="branchId" value={formik.values.branchId} onChange={formik.handleChange}>
                 <option >Select Branch</option>
                {branch?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.branchName}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4 w-full">
              <Label>File</Label>
               <Input 
                type='file'
                className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700" 
               onChange={(e) => {
        const file = e.currentTarget.files?.[0] || null;
        formik.setFieldValue("file", file);
    }}
               /> 
               
            </div>


           
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                  
              >
                Cancel
              </Button>

              <Button
                type="submit"

                className={`${isEditMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}  `}
              >
                {isEditMode ? "Update Course" : "Save Course"}
              </Button>
             
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Course
