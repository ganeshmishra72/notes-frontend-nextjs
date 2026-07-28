"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Building2, Eye, Trash2 } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaPencil } from "react-icons/fa6";
import Image from "next/image";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
 
import { FaUniversity } from "react-icons/fa";
import Authstore from "@/store/AuthStore";
import { useQuery } from "@tanstack/react-query";
import { getUniversities } from "@/service/UniversityService";
import { useFormik } from "formik";
import useUniversity from "@/hooks/Universtiyhooks";
 
 
interface University {
  id: string;
  universityName: string;
  universityCOde: string;
  shortName: string;
  state: string;
  city: string;
  pincode: string;
  type: string;
  website: string;
  email: string;
  phoneNumber: string;
  logoUrl: string;
  establisYear: string;
}

export default function UniversitiesPage() {

  const [open, setOpen] = useState(false);
  const {mutate,isPending,isSuccess}=useUniversity()
  const [editUniversity,setEditUniversity]=useState<University | null>(null);
   const token=Authstore(s=>s.accessToken)
  const { data = [] } = useQuery({
  queryKey: ["university"],
  queryFn: getUniversities,
  enabled: !!token,
  retry: 1,
  staleTime: 1000 * 60 * 5,
  refetchOnWindowFocus: false,
});

const handleEdit = (university: University) => {
  setEditUniversity(university);

  formik.setValues({
    logoUrl: "",
    universityName: university.universityName,
    universityCOde: university.universityCOde,
    shortName: university.shortName,
    state: university.state,
    city: university.city,
    pincode: university.pincode,
    type: university.type,
    website: university.website,
    email: university.email,
    phoneNumber: university.phoneNumber,
    establisYear: university.establisYear,
  });
};

const formik=useFormik({
    initialValues:{logoUrl: "",universityName:"",universityCOde:"",shortName:"",state:"",city:"",pincode:"",type:"",website:"",email:"",phoneNumber:"",establisYear:""},
    onSubmit:(values)=>{
          if(editUniversity){
            console.log("edit");
             setOpen(false)
          }
          else{
            mutate(values)
            setOpen(false)
            formik.resetForm()
          }
           
    }
})

  const isRead=(editUniversity?true:false)
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div>

          <div className="flex items-center gap-3">

            <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">

              <Building2 className="text-blue-600" />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Universities
              </h1>

              <p className="text-slate-500 mt-1">
                Manage all universities available in the platform.
              </p>

            </div>

          </div>

        </div>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg"
        >
          <Plus size={20} />
          Add University
        </motion.button>
       

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Universities"
          value="150"
          color="bg-blue-500"
        />

        <StatCard
          title="Government"
          value="90"
          color="bg-emerald-500"
        />

        <StatCard
          title="Private"
          value="60"
          color="bg-orange-500"
        />

        <StatCard
          title="Added This Month"
          value="12"
          color="bg-violet-500"
        />

      </div>

      {/* Table */}

     <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
  <Table>
    <TableHeader>
      <TableRow className="bg-slate-900 hover:bg-slate-900">
        <TableHead className="text-white">Logo</TableHead>
        <TableHead className="text-white">University</TableHead>
        <TableHead className="text-white">Code</TableHead>
        <TableHead className="text-white">Short Name</TableHead>
        <TableHead className="text-white">Location</TableHead>
        <TableHead className="text-white">Type</TableHead>
        <TableHead className="text-white">Website</TableHead>
        <TableHead className="text-white">Email</TableHead>
        <TableHead className="text-white">Phone</TableHead>
        <TableHead className="text-white">Established</TableHead>
        <TableHead className="text-white text-center">
          Actions
        </TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      {data?.map((item:any) => (
        <TableRow key={item.id}>
          <TableCell>
            <Image
              src={  "/file.svg"}
              alt={item.universityName}
              width={45}
              height={45}
              className="rounded-xl border"
            />
          </TableCell>

          {/* University */}

          <TableCell>
            <div>
              <p className="font-semibold">
                {item.universityName}
              </p>

              <p className="text-xs text-slate-500">
                {item.city}, {item.state}
              </p>
            </div>
          </TableCell>

          {/* Code */}

          <TableCell>{item.universityCOde}</TableCell>

          {/* Short Name */}

          <TableCell>
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {item.shortName}
            </span>
          </TableCell>

          {/* Address */}

          <TableCell>
            <div>
              <p>{item.city}</p>
              <p className="text-xs text-slate-500">
                {item.state} - {item.pincode}
              </p>
            </div>
          </TableCell>

          {/* Type */}

          <TableCell>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                item.type === "Government"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {item.type}
            </span>
          </TableCell>

          {/* Website */}

          <TableCell>
            <a
              href={`https://${item.website}`}
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              Visit
            </a>
          </TableCell>

          {/* Email */}

          <TableCell>{item.email}</TableCell>

          {/* Phone */}

          <TableCell>{item.phoneNumber}</TableCell>

          {/* Established */}

          <TableCell>{item.establisYear}</TableCell>

          {/* Actions */}

          <TableCell>

            <div className="flex justify-center gap-2">

              <Button
                size="icon"
                variant="outline"
              >
                <Eye size={16} />
              </Button>

              <Button  
                onClick={()=>{handleEdit(item),setOpen(true)}}
                size="icon"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <FaPencil size={16} />
              </Button>

              <Button
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

     <Dialog open={open} onOpenChange={setOpen}>
 <DialogContent className="w-[95vw] max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl p-6">
    <DialogHeader>
      <DialogTitle className="text-2xl font-semibold flex items-center gap-2">
        <FaUniversity/> Add University
      </DialogTitle>
    </DialogHeader>

    <form className="grid grid-cols-1 md:grid-cols-2 gap-5 py-4" onSubmit={formik.handleSubmit}>

      <div className="space-y-4">
        <Label>University Name</Label>
        <Input name="universityName" value={formik.values.universityName} onChange={formik.handleChange} />
      </div>

      <div className="space-y-4">
        <Label>University Code</Label>
        <Input name="universityCOde" value={formik.values.universityCOde} onChange={formik.handleChange} />
      </div>

      <div className="space-y-4">
        <Label className={`${editUniversity? "text-gray-400":"text-black"}`}>Short Name</Label>
         <Input name="shortName" value={formik.values.shortName} onChange={formik.handleChange} readOnly={isRead}/>
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Type</Label>
        <select
          name="type"
          value={formik.values.type}
          onChange={formik.handleChange}
          className="w-full h-10 rounded-md border px-3"
          disabled={isRead}
        >
          <option value="">Select</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
        </select>
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>State</Label>
        <Input name="state" value={formik.values.state} onChange={formik.handleChange} readOnly={isRead} />
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>City</Label>
        <Input name="city" value={formik.values.city} onChange={formik.handleChange}  readOnly={isRead}/>
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Pincode</Label>
         <Input name="pincode" value={formik.values.pincode} onChange={formik.handleChange} readOnly={isRead} />
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Website</Label>
         <Input name="website" value={formik.values.website} onChange={formik.handleChange} readOnly={isRead} />
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Email</Label>
        <Input name="email" value={formik.values.email} onChange={formik.handleChange} readOnly={isRead} />
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Phone Number</Label>
         <Input name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} readOnly={isRead} />
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Established Year</Label>
         <Input name="establisYear" value={formik.values.establisYear} onChange={formik.handleChange} readOnly={isRead} />
      </div>

      <div className="space-y-4">
        <Label  className={`${editUniversity? "text-gray-400":"text-black"}`}>Logo URL</Label>
         <Input name="logoUrl" value={formik.values.logoUrl} onChange={formik.handleChange} readOnly={isRead} />
      </div>


      <Button
        variant="outline"
        onClick={() => setOpen(false)}
      >
        Cancel
      </Button>

      <Button
       type="submit"
      
        className={`${isRead?"bg-green-600 hover:bg-green-700":"bg-blue-600 hover:bg-blue-700"}`}
      >
        {isRead ?"Update University":"Save University"}
      </Button>
    </form>
  </DialogContent>
</Dialog>

    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  color: string;
}

function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">

      <div className={`h-1 ${color}`} />

      <div className="p-6">

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900">
          {value}
        </h2>

      </div>

    </div>
  );
}