"use client";

import { delteUserData, updateuserData, uploadImage } from "@/hooks/Userhook";
import { getProfile } from "@/service/UserService";
import Authstore from "@/store/AuthStore";
import { Dialog, DialogPanel } from "@headlessui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { Award, Bookmark, BookOpen, Calendar, Camera, Download, FileText, LogOut, Mail, Moon, Pencil, Phone, Save, Settings, Shield, Sun, Trash2, Upload, User, X } from "lucide-react";
import Layout from "./Layout";
import { FcSettings } from "react-icons/fc";
import { useLogout } from "@/hooks/Authhooks";
import {  useRouter } from "next/navigation";
import { refresh } from "next/cache";

const stats = [
  {
    title: "Downloads",
    value: "124",
    icon: Download,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Uploads",
    value: "18",
    icon: Upload,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Bookmarks",
    value: "42",
    icon: Bookmark,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Certificates",
    value: "03",
    icon: Award,
    color: "bg-purple-100 text-purple-600",
  },
];

const quickaction = [
  {
    icon: Upload,
    title: "Uplaod Notes"
  },
  {
    icon: Download,
    title: "My Download"
  },
  {
    icon: Save,
    title: "Save Notes"
  },

]

const ProfileSchema = Yup.object({

  name: Yup.string().required("Required"),

  phone: Yup.string(),

  bio: Yup.string().max(250),

});
const Profile = () => {
  const queryClinet = useQueryClient()
  const [openEdit, setOpenEdit] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { mutate: updateProfile } = updateuserData();
  const { mutate: deleteUser } = delteUserData();
  const { mutate } = uploadImage()
  const {mutate:logoutSession}=useLogout()
  const token: any = Authstore(sta => sta.refreshToken)
  const router=useRouter()

  const formik = useFormik({
    initialValues: { image: null, id: "", name: "", email: "", bio: "", phone: "", createdAt: null, updatedAt: null, role: "", provider: "", lastlogin: "" },
    validationSchema: ProfileSchema,
    onSubmit: () => {
      handelUpdate();
    }
  })
  const [image, setImage] = useState<any>(null)
  const fileRef = useRef<any>(null)
  const handelImageClick = () => {
    fileRef.current.click();
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      setImage(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
      mutate({ email: data?.email, file: file }, {
        onSuccess: (value) => {
          console.log(value.image);

          formik.setFieldValue("image", value.image)
          setImage(value.image)

        }
      })

    } catch (error) {
      console.log(error);


    }
  }
  const { data, error, isError, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ["profile"],
    enabled: !!token,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    retry: 1,
    select: (data) => ({
      id: data.id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      image: data.image,
      provider: data.provider,
      lastlogin: data.lastLogin,
      bio: data.bio,
      emailVerified: data.emailVerified,
      enabled: data.enabled
    })
  })

  useEffect(() => {
    formik.setValues({
      image: data?.image || null,
      id: data?.id || "",
      name: data?.name || " ",
      phone: data?.phone || "",
      role: data?.role || "",
      createdAt: data?.createdAt || "",
      updatedAt: data?.updatedAt || "",
      email: data?.email || "",
      provider: data?.provider || "",
      lastlogin: data?.lastlogin || "",
      bio: data?.bio || ""

    })
    if (isError) {
      toast.error(error?.message || "Backend Server Down")
    }

  }, [error, isError, data])


  const handelDelete = () => {
    deleteUser(data?.email, {
      onSuccess: () => {
        toast.success("Deleted Successfully")
        queryClinet.removeQueries({ queryKey: ["profile"] })
        mutate(token)
      },
      onError: () => toast.error("Deleted Failed")
    })
  }

  const handelUpdate = () => {

    if (!data?.email) {
      toast.error("User Email not found");
      return;
    }
    console.log(data?.email);

    const payload = {

      name: formik.values.name,

      phone: formik.values.phone,

      bio: formik.values.bio,
    }
    updateProfile({ email: data.email, data: payload },
      {
        onSuccess: () => {
           
          queryClinet.setQueryData(["profile"], (old: any) => ({ ...old, ...payload }))
          setOpenEdit(false)
        },
        onError: () => { toast.error("Updaet Failed") }
      }
    )
  }

   const handelLogout=()=>{
     logoutSession(undefined)
     setOpenSettings(false)
     router.refresh()
     router.push("/")
  }

  if (isLoading) return <div className='flex items-center justify-center w-4xl'> WAIT</div>
  //  if (isLoading) return <div className='flex items-center justify-center w-4xl'> <Spinner /></div>
  if (isError) {
    return (
      <Layout>
        <div className="text-center mt-20 text-red-500">
          Failed to load bookings
        </div>
      </Layout>
    );
  }

  console.log(data);
  
  return (
    <div className="min-h-screen bg-slate-50  md:pt-16 pb-20 pt-8">
      <div className="max-w-7xl mx-auto px-6">

        {/* Profile Header */}
        <Link href={"/"} className="text-gray-700 font-bold text-lg
         flex items-center gap-1 pb-6">
          <FaHome />Home
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 to-sky-500 text-white p-8 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div className="flex items-center gap-6 flex-col lg:flex-row">

              <div className="w-28 h-28 rounded-full bg-white overflow-hidden flex items-center justify-center shadow-xl" onClick={handelImageClick}>
                {data?.image ? (
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={55} className="text-blue-600" />
                )}
                <input
                  type="file"
                  ref={fileRef}
                  className='hidden'
                  accept="image/*"
                  onChange={handleImageChange}
                  id='image'
                  name='image'
                />
              </div>

              <div>

                <h1 className="text-4xl font-bold">
                  {data?.name}
                </h1>

                <p className="mt-2 text-blue-100">
                  Computer Engineering Student
                </p>

                <div className="flex flex-wrap gap-3 mt-5">

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    {data?.role}
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    {data?.provider}
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    {data?.enabled ? "Active Account" : "Disabled"}
                  </span>

                  <span className="bg-white/20 px-4 py-2 rounded-full text-sm">
                    {data?.emailVerified ? "Email Verified" : "Email Not Verified"}
                  </span>

                </div>

              </div>

            </div>

            <button onClick={() => setOpenEdit(true)} className="bg-white text-blue-600 rounded-xl px-6 py-3 font-semibold flex items-center gap-2 hover:scale-105 transition">
              <Pencil size={18} />
              Edit Profile
            </button>

          </div>
          <Dialog
            open={openEdit}
            onClose={() => setOpenEdit(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 md:p-0 "
          >
            <DialogPanel className="bg-white rounded-3xl w-full max-w-lg p-8 ">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Edit Profile</h2>

              </div>
              <form className="space-y-5" onSubmit={formik.handleSubmit}>
                <div>
                  <label className="text-gray-700">Name</label>
                  <input
                    name="name"
                    className="w-full border rounded-xl p-3 mt-1 text-gray-700"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-sm">{formik.errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700">Phone</label>
                  <input
                    name="phone"
                    className="w-full border rounded-xl p-3 mt-1 text-gray-700"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="text-gray-700">Bio</label>
                  <textarea
                    rows={4}
                    name="bio"
                    className="w-full border rounded-xl p-3 mt-1 text-gray-700"
                    value={formik.values.bio}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.bio && formik.errors.bio && (
                    <p className="text-red-500 text-sm">{formik.errors.bio}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setOpenEdit(false)}
                    className="px-5 py-2 rounded-xl border text-red-700 "
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-5 py-2 rounded-xl flex gap-2"
                  >
                    <Save size={18} />
                    Save
                  </button>
                </div>
              </form>
            </DialogPanel>

          </Dialog>
        </motion.div>

        {/* Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10 ">

          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                whileHover={{ y: -5 }}
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-sm border"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
                >
                  <Icon size={28} />
                </div>

                <h2 className="mt-6 text-3xl font-bold text-gray-700">
                  {item.value}
                </h2>

                <p className="text-slate-500">
                  {item.title}
                </p>
              </motion.div>
            );
          })}

        </div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-3 gap-8 mt-10">

          {/* Personal Info */}

          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border">

            <h2 className="text-2xl font-bold mb-8 text-gray-700">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

              <InfoCard icon={<User />} label="Full Name" value={data?.name} />

              <InfoCard icon={<Mail />} label="Email" value={data?.email} />
              <InfoCard
                icon={<User />}
                label="Role"
                value={data?.role}
              />
              <InfoCard
                icon={<BookOpen />}
                label="Login Provider"
                value={data?.provider}
              />
              <InfoCard icon={<Phone />} label="Phone" value={data?.phone || "Not Added"} />
              <InfoCard
                icon={<FileText />}
                label="Bio"
                value={data?.bio || "No bio added yet."}
              />
              <InfoCard
                icon={<Settings />}
                label="Account Status"
                value={data?.enabled ? "Active" : "Disabled"}
              />
              <InfoCard
                icon={<Calendar />}
                label="Last Login"
                value={new Date(data?.lastlogin).toLocaleString()}
              />
              <InfoCard
                icon={<Calendar />}
                label="Joined On"
                value={new Date(data?.createdAt).toLocaleDateString()}
              />
            </div>

          </div>

          {/* Quick Actions */}

          <div className="bg-white rounded-3xl p-8 shadow-sm border">

            <h2 className="text-2xl font-bold mb-8 text-gray-700">
              Quick Actions
            </h2>

            <div className="space-y-4">
              {
                quickaction.map((item, id) => (
                  <button key={id} className="w-full rounded-2xl border p-4 flex items-center gap-4 hover:bg-blue-50 hover:border-blue-500 transition">
                    <div className="text-blue-600"><item.icon /></div>
                    <span className="font-medium text-slate-700">{item.title}</span>
                  </button>
                ))
              }
              <button onClick={() => setOpenSettings(true)} className="w-full rounded-2xl border p-4 flex items-center gap-4 hover:bg-blue-50 hover:border-blue-500 transition">
                <div className="text-blue-600"><Settings /></div>
                <span className="font-medium text-slate-700">Account Setting</span>
              </button>
            </div>

          </div>

        </div>

        <Dialog

          open={openSettings}

          onClose={() => setOpenSettings(false)}

          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4 md:p-0"

        >

          <DialogPanel className="bg-white rounded-3xl w-[380px] p-7">

            <h2 className="text-xl font-bold mb-6 text-gray-700">

              Account Settings

            </h2>

            <div className="space-y-4">

              <button

                className="w-full flex items-center justify-between p-4 rounded-xl border hover:bg-slate-100 text-gray-700"

                onClick={() => setDarkMode(!darkMode)}

              >

                <div className="flex items-center gap-3  ">

                  {darkMode ? <Sun /> : <Moon />}

                  <span>

                    {darkMode ? "Light Theme" : "Dark Theme"}

                  </span>

                </div>

              </button>

              <button

                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-slate-100 text-gray-700"

              >

                <Camera />

                Change Profile Picture

              </button>

              <button

                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-slate-100 text-gray-700"

              >
                <Shield />
                Privacy Settings
              </button>

              <button
                className="w-full flex items-center gap-3 p-4 rounded-xl border hover:bg-slate-100 text-gray-700"
                  onClick={()=>handelLogout()}
              >
                <LogOut />
                Logout
              </button>

              <button onClick={()=>handelDelete()}
                className="w-full flex items-center gap-3 p-4 rounded-xl border text-red-600 hover:bg-red-50"

              >
                <Trash2 />
                Delete Account
              </button>

            </div>

          </DialogPanel>

        </Dialog>

        {/* Recent Activity */}

        <div className="bg-white rounded-3xl p-8 shadow-sm border mt-10">

          <h2 className="text-2xl font-bold mb-8 text-gray-700">
            Recent Activity
          </h2>

          <div className="space-y-5">

            <Activity
              title="Downloaded Java Programming Notes"
              time="2 hours ago"
            />

            <Activity
              title="Bookmarked Operating System Notes"
              time="Yesterday"
            />

            <Activity
              title="Downloaded DBMS Question Bank"
              time="2 days ago"
            />

            <Activity
              title="Uploaded CN Lab Manual"
              time="Last Week"
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border p-5 bg-slate-50">
      <div className="text-blue-600">{icon}</div>
      <p className="text-sm text-slate-500 mt-2">{label}</p>
      <h3 className="font-semibold text-lg text-slate-800">{value}</h3>
    </div>
  );
}


function Activity({
  title,
  time,
}: {
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between border rounded-2xl p-5 hover:bg-slate-50 transition">
      <div>
        <h3 className="font-semibold text-slate-800">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">{time}</p>
      </div>

      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
    </div>
  );
}