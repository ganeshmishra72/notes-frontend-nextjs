"use client"
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, GraduationCapIcon, Pencil, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { FaGraduationCap } from 'react-icons/fa6'
import { motion } from "framer-motion";
import Authstore from '@/store/AuthStore'
import { useQuery } from '@tanstack/react-query'
import { getAllBaord } from '@/service/BaordService'
import { useFormik } from 'formik'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useBoard, useDeleteBoard, useUpdateBoard } from '@/hooks/Boardhook'


interface Board {
  id: string;
  boradName: string;
  shortName: string;
  website: string;
}
const Board = () => {
  const [open, setOpen] = useState(false);
   const {mutate }=useBoard()
  const {mutate: updateBoardDetails}=useUpdateBoard()
  const {mutate:deleteBoardData}=useDeleteBoard()
  const [editBoard, setEditBoard] = useState<Board | null>(null);
  const token = Authstore(s => s.accessToken)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['boards'],
    queryFn: getAllBaord,
    enabled: !!token,
    retry: 1,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  })

  const formik = useFormik({
    initialValues: { id: "", website: "", boradName: "", shortName: "" },
    onSubmit: (values) => {
      if (editBoard) {
         
        updateBoardDetails({boardId:values.id,updateBoardData:values })
        setOpen(false)
      }
      else {
        mutate(values)
        setOpen(false)
        formik.resetForm()
      }

    }
  })
  const handleEdit = (board: Board) => {
    setEditBoard(board);

    formik.setValues({

      id: board.id,

      website: board.website,
      boradName: board.boradName,
      shortName: board.shortName

    });
  };

  const handelDelete = (boardId: string) => {
     deleteBoardData(boardId)
  }
  const isEditMode = editBoard !== null;
  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaGraduationCap className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Boards
              </h1>
              <p className="text-slate-500 mt-1">
                Manage all Board available in the platform.
              </p>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => { setOpen(true), setEditBoard(null), formik.resetForm() }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          <Plus size={20} />
          Add Boards
        </motion.button>
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-white">Board Name</TableHead>
              <TableHead className="text-white">Short Name</TableHead>
              <TableHead className="text-white">Website</TableHead>
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
                  Failed to load boards
                </TableCell>
              </TableRow>
            )}

            {!isLoading && !isError && data?.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6">
                  No boards found
                </TableCell>
              </TableRow>
            )}

            {data?.map((board: any) => (
              <TableRow key={board.id}>
                <TableCell>{board.boradName}</TableCell>
                <TableCell>{board.shortName}</TableCell>
                <TableCell>
                  <a
                    href={board.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {board.website}
                  </a>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={()=>{handleEdit(board),setOpen(true)}}
                      className="text-slate-600 hover:text-blue-600"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handelDelete(board.id)}
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
              <GraduationCapIcon /> Add Board
            </DialogTitle>
          </DialogHeader>

          <form className="flex flex-col   gap-5 py-4" onSubmit={formik.handleSubmit}>

            <div className="space-y-4  w-full">
              <Label>Baord Name</Label>
              <Input name="boradName" value={formik.values.boradName} onChange={formik.handleChange} />
            </div>


            {isEditMode && <>
              <div className="space-y-4 w-full">
                <Label >Short Name</Label>
                <Input name="shortName" value={formik.values.shortName} onChange={formik.handleChange} />
              </div>

              <div className="space-y-4 w-full">
                <Label  >Website</Label>
                <Input name="website" value={formik.values.website} onChange={formik.handleChange} />
              </div>


            </>
            }

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
              {isEditMode ? "Update Board" : "Save Board"}
            </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Board
