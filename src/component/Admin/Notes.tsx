import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Eye, LucideLayers3, NotebookIcon, Trash2 } from 'lucide-react'
import React from 'react'
import { FaGraduationCap } from 'react-icons/fa6'

const Notes = () => {
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
      </div>

      <div className="rounded-md border bg-white shadow-sm overflow-x-auto no-scrollbar">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-900 hover:bg-slate-900">
              <TableHead className="text-white">Photo</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Email</TableHead>
              <TableHead className="text-white">Phone</TableHead>
              <TableHead className="text-white">Bio</TableHead>
              <TableHead className="text-white">Role</TableHead>
              <TableHead className="text-white">Provider</TableHead>
              <TableHead className="text-white">isEmailVerfired</TableHead>
              <TableHead className="text-white">Enabled</TableHead>
              <TableHead className="text-white">lastLogin</TableHead>
              <TableHead className="text-white text-center">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Notes
