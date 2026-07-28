"use client";
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteProfile, getAllUsers } from '@/service/UserService'
import Authstore from '@/store/AuthStore'
import { useQuery } from '@tanstack/react-query'
import { Eye, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { FaPencil, FaUsers } from 'react-icons/fa6'
import { FadeLoader } from 'react-spinners';
import Layout from './Layout';
import { delteUserData, useUpdateUserStatus } from '@/hooks/Userhook';

const Users = () => {
  const [enabled, setEnabled] = useState(false)
  const token = Authstore(s => s.accessToken)
  const { mutate } = delteUserData()
  const { mutate: updateStatus } = useUpdateUserStatus()
  const { data, isError, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getAllUsers,
    enabled: !!token,
    retry: 1, staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,

  })

  const handelDelete = (email: string) => {
    mutate(email)
  }

  const handelChamgeStatus = (email: string, currentStatus: boolean) => {
    updateStatus({ email: email, enable: !currentStatus })
  }
  if (isLoading) return <div className='flex items-center justify-center w-4xl'>
    <FadeLoader />
  </div>
  if (isError) {
    return (
      <Layout>
        <div className="text-center mt-20 text-red-500">
          Failed to load Users
        </div>
      </Layout>
    );
  }
   


  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
              <FaUsers className="text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Users
              </h1>
              <p className="text-slate-500 mt-1">
                Manage all users available in the platform.
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
            {data?.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>
                  <img
                    src={item.image || "/file.svg"}
                    alt={item.name}
                    width={45}
                    height={45}
                    className="rounded-xl border"
                  />
                </TableCell>

                {/* University */}

                <TableCell>

                  {item.name}

                </TableCell>

                {/* Code */}

                <TableCell>{item.email}</TableCell>

                {/* Short Name */}

                <TableCell>

                  {item.phone}

                </TableCell>

                {/* Address */}

                <TableCell>
                  <span className='max-w-md'>

                    {item.bio}
                  </span>
                </TableCell>
                <TableCell>
                  {item.role}
                </TableCell>
                <TableCell>
                  {item.provider}
                </TableCell>



                <TableCell>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${item.emailVerified
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-orange-100 text-orange-700"
                      }`}
                  >
                    {item.emailVerified ? "YES" : "NO"}
                  </span>
                </TableCell>



                {/* Email */}

                <TableCell>{<span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.enabled
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-orange-100 text-orange-700"
                    }`}
                >
                  {item.enabled ? "YES" : "NO"}
                </span>}</TableCell>

                {/* Phone */}

                <TableCell>{item.lastLogin}</TableCell>



                <TableCell>

                  <div className="flex justify-center gap-2">
                    <Button
                      onClick={() => handelChamgeStatus(item.email, item.enabled)}
                      size="icon"
                      variant={'outline'}
                    >
                      <Eye size={16} />
                    </Button>

                    <Button
                      onClick={() => handelDelete(item.email)}
                      size="icon"
                      variant="destructive"
                    >
                      <Trash2 size={16} />
                    </Button>

                  </div>

                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Users
