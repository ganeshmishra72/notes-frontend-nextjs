"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { GraduationCapIcon, Layers3, Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { motion } from "framer-motion";
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useBranch, useDeleteBranch, useUpdateBranch } from '@/hooks/Branchehook'
import { getAllBranche, getAllCourses } from '@/util/UniversityService'


interface Branch {
       id:string;
     branchName:string;
     courseId:string;
}
const Branches = () => {
  const [open, setOpen] = useState(false);
   const {mutate }=useBranch()
  const {mutate: updateBranchDetails}=useUpdateBranch()
  const {mutate:deleteBranchData}=useDeleteBranch()
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const { data, isError, isLoading } =getAllBranche()

  const formik = useFormik({
    initialValues: { id: "", branchName:"",courseId:"" },
    onSubmit: (values) => {
      if (editBranch) {
         
        updateBranchDetails({branchId:values.id,updateBranchData:values })
        setOpen(false)
      }
      else {
        mutate(values)
        setOpen(false)
        formik.resetForm()
      }

    }
  })
  const handleEdit = (branch: Branch) => {
    setEditBranch(branch);

    formik.setValues({

      id: branch.id,
      branchName:branch.branchName,
      courseId:branch.courseId

    });
  };

  const handelDelete = (branchId: string) => {
     deleteBranchData(branchId)
  }

  const {data:course}=getAllCourses()
   const courseMap = React.useMemo(() => {
  return (
    course?.reduce((acc: any, course: any) => {
      acc[course.id] = course.coursedName;
      return acc;
    }, {}) || {}
  );
}, [course]);
  const isEditMode = editBranch !== null;
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
                Branches
              </h1>
              <p className="text-slate-500 mt-1">
                Manage all Branch available in the platform.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setOpen(true), setEditBranch(null), formik.resetForm() }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          <Plus size={20} />
          Add Branch
        </motion.button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-white">Branch Name</TableHead>
              <TableHead className="text-white">Course Name</TableHead>
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
                  Failed to load branches
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No branches found
                </TableCell>
              </TableRow>
            )}

            {data?.map((branch: any) => (
              <TableRow key={branch.id}>
                <TableCell>{branch.branchName}</TableCell>
                
                 <TableCell>{courseMap[branch.courseId || "-"]}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={()=>{handleEdit(branch),setOpen(true)}}
                      className="text-slate-600 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handelDelete(branch.id)}
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
              <GraduationCapIcon /> Add Branch
            </DialogTitle>
          </DialogHeader>

          <form className="flex flex-col   gap-5 py-4" onSubmit={formik.handleSubmit}>

            <div className="space-y-4  w-full">
              <Label>Branch Name</Label>
              <Input name="branchName" value={formik.values.branchName} onChange={formik.handleChange} />
            </div>
 
               <div className="space-y-4 w-full">
                           <Label>Course</Label>
                            <select className="border rounded-xl h-12 px-4 border-slate-300 text-gray-700 w-full"  name="courseId" value={formik.values.courseId} onChange={formik.handleChange}>
                              <option >Select Course</option>
                             {course?.map((item:any)=>(
                               <option key={item.id} value={item.id}>{item.coursedName}</option>
                             ))}
                           </select>
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
              {isEditMode ? "Update Branch" : "Save Branch"}
            </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Branches
