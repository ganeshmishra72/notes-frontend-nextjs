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
import { getAllBranche, getAllCourses, getALLSemester } from '@/util/UniversityService'
import { useDeleteSemester, useSemester, useUpdateSemester } from '@/hooks/Semesterhook'


interface Semester {
        id:string;
     semesterNumber:number;
    semesterName:string;
    branchId:string;
    academicYear:string;
}
const Semester = () => {
  const [open, setOpen] = useState(false);
   const {mutate }=useSemester()
  const {mutate: updateSemetserDetails}=useUpdateSemester()
  const {mutate:deleteSemeterData}=useDeleteSemester()
  const [editSemester, setEditSemester] = useState<Semester | null>(null);
  const { data, isError, isLoading } =getALLSemester()

  const formik = useFormik({
    initialValues: { id: "", semesterNumber:0,semesterName:"", branchId:"",academicYear:""},
    onSubmit: (values) => {
      if (editSemester) {
         
        updateSemetserDetails({semesterId:values.id,updateSemesterData:values })
        setOpen(false)
      }
      else {
        mutate(values)
        setOpen(false)
        formik.resetForm()
      }

    }
  })
  const handleEdit = (semester: Semester) => {
    setEditSemester(semester);

    formik.setValues({

      id:semester.id,
      semesterName:semester.semesterName,
      branchId:semester.branchId,
      academicYear:semester.academicYear,
      semesterNumber:semester.semesterNumber
      

    });
  };

  const handelDelete = (semesterId: string) => {
     deleteSemeterData(semesterId)
  }

    const {data:branch}=getAllBranche()
   const branchMap = React.useMemo(() => {
    return (
      branch?.reduce((acc: any, branch: any) => {
        acc[branch.id] = branch.branchName;
        return acc;
      }, {}) || {}
    );
  }, [branch]);
  
  const isEditMode = editSemester !== null;
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <Layers3 className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Semesters
              </h1>
              <p className="text-slate-500 mt-1">
                Manage all Semester available in the platform.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setOpen(true), setEditSemester(null), formik.resetForm() }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          <Plus size={20} />
          Add Semester
        </motion.button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-white">Semester </TableHead>
              <TableHead className="text-white">Semester Name</TableHead>
              <TableHead className="text-white text-center">Branch</TableHead>
              <TableHead className="text-white text-center">Academic Year</TableHead>
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
                  Failed to load semesters
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No semesters found
                </TableCell>
              </TableRow>
            )}

            {data?.map((semester: any) => (
              <TableRow key={semester.id}>
                <TableCell>{semester.semesterNumber}</TableCell>
                <TableCell>{semester.semesterName}</TableCell>
                
                <TableCell>{branchMap[semester.branchId || "-"]}</TableCell>
                 <TableCell>{semester.academicYear}</TableCell>
                
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={()=>{handleEdit(semester),setOpen(true)}}
                      className="text-slate-600 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handelDelete(semester.id)}
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
              <GraduationCapIcon /> Add Semester
            </DialogTitle>
          </DialogHeader>

          <form className="flex flex-col   gap-5 py-4" onSubmit={formik.handleSubmit}>

            <div className="space-y-4  w-full">
              <Label>Semester </Label>
              <Input name="semesterNumber" value={formik.values.semesterNumber} onChange={formik.handleChange} />
            </div>
            <div className="space-y-4  w-full">
              <Label>Semester Name </Label>
              <Input name="semesterName" value={formik.values.semesterName} onChange={formik.handleChange} />
            </div>
            <div className="space-y-4 w-full">
              <Label>Branch</Label>
               <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700 w-full"  name="branchId" value={formik.values.branchId} onChange={formik.handleChange}>
                 <option >Select Branch</option>
                {branch?.map((item:any)=>(
                  <option key={item.id} value={item.id}>{item.branchName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-4  w-full">
              <Label>Academic Year </Label>
              <Input name="academicYear" value={formik.values.academicYear} onChange={formik.handleChange} />
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
              {isEditMode ? "Update Semester" : "Save Semester"}
            </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Semester
