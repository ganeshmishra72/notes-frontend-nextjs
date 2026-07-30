"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GraduationCapIcon, Layers3, Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { motion, number } from "framer-motion";
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useBranch, useDeleteBranch, useUpdateBranch } from '@/hooks/Branchehook'
import { getAllBranche, getAllCourses, getALLSemester, getAllSubject } from '@/util/UniversityService'
import { useDeleteSemester, useSemester, useUpdateSemester } from '@/hooks/Semesterhook'
import { useDeleteSubject, useSubject, useUpdateSubject } from '@/hooks/Subjecthook'
import { IoBook } from 'react-icons/io5'


interface Subject {
        id:string;
      name:string;
    semesterId:string;
  credits:number;
  theoryMarks:number;
  practicalMarks:number;
}
const Subject = () => {
  const [open, setOpen] = useState(false);
   const {mutate }=useSubject()
  const {mutate: updateSubjectData}=useUpdateSubject()
  const {mutate:deleteSubjectData}=useDeleteSubject()
  const [editSubject, setEditSubject] = useState<Subject | null>(null);
  const { data, isError, isLoading } =getAllSubject()

  const formik = useFormik({
    initialValues: { id: "", name:"",semesterId:"", credits:0,theoryMarks:0,practicalMarks:0},
    onSubmit: (values) => {
      if (editSubject) {
         
        updateSubjectData({subjectId:values.id,updateSubjectData:values })
        setOpen(false)
      }
      else {
        mutate(values)
        setOpen(false)
        formik.resetForm()
      }

    }
  })
  const handleEdit = (subject: Subject) => {
    setEditSubject(subject);

    formik.setValues({

      id:subject.id,
      name:subject.name,
      theoryMarks:subject.theoryMarks,
      semesterId:subject.semesterId,
      practicalMarks:subject.practicalMarks,
      credits:subject.credits
      

    });
  };

  const handelDelete = (subjectId: string) => {
     deleteSubjectData(subjectId)
  }

   const {data:semester}=getALLSemester()
    const semesterMap = React.useMemo(() => {
     return (
       semester?.reduce((acc: any, semester: any) => {
         acc[semester.id] = semester.semesterName;
         return acc;
       }, {}) || {}
     );
   }, [semester]);
  
  const isEditMode = editSubject !== null;
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <IoBook className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Subjects
              </h1>
              <p className="text-slate-500 mt-1">
                Manage all Subject available in the platform.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setOpen(true), setEditSubject(null), formik.resetForm() }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          <Plus size={20} />
          Add Subject
        </motion.button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-white">Subject Name </TableHead>
              <TableHead className="text-white">Semester Name</TableHead>
              <TableHead className="text-white text-center">Credits</TableHead>
              <TableHead className="text-white text-center">Theory Marks</TableHead>
              <TableHead className="text-white text-center">Practical Marks</TableHead>
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
                  Failed to load subject
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No subject found
                </TableCell>
              </TableRow>
            )}

            {data?.map((subject: any) => (
              <TableRow key={subject.id}>
                <TableCell>{semester.name}</TableCell>

                   <TableCell>{semesterMap[subject.semesterId || "-"]}</TableCell>
                <TableCell>{semester.credits}</TableCell>
                <TableCell>{semester.theoryMarks}</TableCell>
                <TableCell>{semester.practicalMarks}</TableCell>
                 
                
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={()=>{handleEdit(subject),setOpen(true)}}
                      className="text-slate-600 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handelDelete(subject.id)}
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
              <IoBook /> Add Subject
            </DialogTitle>
          </DialogHeader>

          <form className="flex flex-col   gap-5 py-4" onSubmit={formik.handleSubmit}>

            <div className="space-y-4  w-full">
              <Label>Subject Name </Label>
              <Input name="name" value={formik.values.name} onChange={formik.handleChange} />
            </div>
             <div className="space-y-4 w-full">
                          <Label>Semester</Label>
                           <select className="border w-full rounded-xl h-12 px-4 border-slate-300 text-gray-700"  name="semesterId" value={formik.values.semesterId} onChange={formik.handleChange}>
                             <option >Select Semester</option>
                            {semester?.map((item:any)=>(
                              <option key={item.id} value={item.id}>{item.semesterName}</option>
                            ))}
                          </select>
                        </div>
            
             <div className="space-y-4  w-full">
              <Label>Credits </Label>
              <Input name="credits" value={formik.values.credits} onChange={formik.handleChange} />
            </div>
            <div className="space-y-4  w-full">
              <Label> Theory Marks </Label>
              <Input name="theoryMarks" value={formik.values.theoryMarks} onChange={formik.handleChange} />
            </div>
            <div className="space-y-4  w-full">
              <Label>Practical Marks </Label>
              <Input name="practicalMarks" value={formik.values.practicalMarks} onChange={formik.handleChange} />
            </div>
           <div className='flex  gap-2'>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className={"flex-1"}
            >
              Cancel
            </Button>

            <Button
              type="submit"

              className={`${isEditMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} flex-1`}
            >
              {isEditMode ? "Update Subject" : "Save Subject"}
            </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Subject
