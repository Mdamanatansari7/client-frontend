// src/components/RegistrationForm.jsx
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  clearRegisterState,
} from "../../features/userRegisterSlice";

import Footer from "../footer"; // adjust path if needed

const SPORTS_OPTIONS = [
  "cricket",
  "football",
  "basketball",
  "volleyball",
  "badminton",
  "tug of war",
  "carrom",
  "athletics",
  "rangoli",
  "chess",
  "face painting",
  "mehandi",
  "shot put",
];

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((s) => s.register);

  // Prevent double submission after success: local state
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      year: "",
      branch: "CSE", // <-- Auto-select CSE branch
      rollNumber: "",
      whatsappNumber: "",
      contactNumber: "",
      gender: "",
      sports: [],
      image: null,
    },
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const selectedSports = watch("sports") || [];

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
  const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  useEffect(() => {
    dispatch(clearRegisterState());
    return () => {
      dispatch(clearRegisterState());
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // If backend returns success, mark submitted to block further submissions
    if (success) {
      setSubmitted(true);
    }
  }, [success]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0] ?? null;
    setValue("image", file, { shouldValidate: true });
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      setValue("image", null, { shouldValidate: true });
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setValue("image", null, { shouldValidate: true });
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const onlyDigitsInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const buildFormData = (values) => {
    const fd = new FormData();
    fd.append("firstName", (values.firstName || "").trim());
    fd.append("lastName", (values.lastName || "").trim());
    fd.append("email", (values.email || "").trim().toLowerCase());
    fd.append("year", (values.year || "").toLowerCase());
    fd.append("branch", (values.branch || "").trim());
    fd.append("rollNumber", (values.rollNumber || "").toUpperCase().trim());
    fd.append("whatsappNumber", values.whatsappNumber || "");
    fd.append("contactNumber", values.contactNumber || "");
    fd.append("gender", (values.gender || "").toLowerCase());
    fd.append("sports", JSON.stringify(values.sports || []));
    if (values.image) {
      fd.append("image", values.image);
    }
    return fd;
  };

  const onSubmit = async (values) => {
    // Prevent double-submission protection (if already flagged)
    if (submitted) return;

    const fd = buildFormData(values);
    const resultAction = await dispatch(registerUser(fd));

    if (registerUser.fulfilled.match(resultAction)) {
      // mark submitted to avoid resubmission
      setSubmitted(true);
      reset();
      setPreviewUrl(null);
    }
    // Note: if server returns failure, submitted remains false so user can retry.
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center p-6 py-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-gradient-to-br from-white/3 to-white/2 backdrop-blur-md p-8 rounded-3xl border border-white/6 shadow-2xl"
          noValidate
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400">
            Join Frolic 2025
          </h2>

          {/* First / Last */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1.5 text-sm text-white/90">
                First Name
              </label>
              <input
                {...register("firstName", {
                  required: "First name is required",
                  minLength: { value: 3, message: "Min 3 chars" },
                  maxLength: { value: 30, message: "Max 30 chars" },
                  setValueAs: (v) => (v || "").trim(),
                })}
                className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="Your first name"
                disabled={submitted}
              />
              {errors.firstName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1.5 text-sm text-white/90">
                Last Name
              </label>
              <input
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: { value: 1, message: "Min 1 char" },
                  maxLength: { value: 30, message: "Max 30 chars" },
                  setValueAs: (v) => (v || "").trim(),
                })}
                className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="Your last name"
                disabled={submitted}
              />
              {errors.lastName && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="block mb-1.5 text-sm text-white/90">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
              placeholder="you@example.com"
              disabled={submitted}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Year / Branch (branch auto CSE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1.5 text-sm text-white/90">Year</label>
              <select
                {...register("year", { required: "Please select year" })}
                className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
                disabled={submitted}
              >
                <option value="" className="text-gray-700">Select year</option>
                <option value="first" className="text-gray-700">First</option>
                <option value="second" className="text-gray-700">Second</option>
                <option value="third" className="text-gray-700">Third</option>
                <option value="fourth" className="text-gray-700">Fourth</option>
              </select>
              {errors.year && (
                <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
              )}
            </div>

            <div>
              <label className="block mb-1.5 text-sm text-white/90">Branch</label>

              {/* Branch as select with CSE auto-selected */}
              <select
                {...register("branch", { required: "Branch is required" })}
                className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
                disabled={submitted}
              >
                <option value="CSE">CSE (Computer Science)</option>
                
              </select>

              {errors.branch && (
                <p className="text-red-400 text-sm mt-1">{errors.branch.message}</p>
              )}
            </div>
          </div>

          {/* Roll Number */}
          <div className="mt-4">
            <label className="block mb-1.5 text-sm text-white/90">Roll Number</label>
            <input
              {...register("rollNumber", {
                required: "Roll number required",
                pattern: {
                  value: /^[A-Za-z0-9/]+$/,
                  message: "Only letters, numbers and / allowed",
                },
                setValueAs: (v) => (v || "").toUpperCase().trim(),
              })}
              className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
              placeholder="e.g. CSE/105/22"
              disabled={submitted}
            />
            {errors.rollNumber && (
              <p className="text-red-400 text-sm mt-1">{errors.rollNumber.message}</p>
            )}
          </div>

          {/* Contact numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1.5 text-sm text-white/90">
                WhatsApp Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                onInput={onlyDigitsInput}
                {...register("whatsappNumber", {
                  required: "WhatsApp number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="10 digits"
                disabled={submitted}
              />
              {errors.whatsappNumber && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.whatsappNumber.message}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-1.5 text-sm text-white/90">
                Contact Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                onInput={onlyDigitsInput}
                {...register("contactNumber", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400"
                placeholder="10 digits"
                disabled={submitted}
              />
              {errors.contactNumber && (
                <p className="text-red-400 text-sm mt-1">{errors.contactNumber.message}</p>
              )}
            </div>
          </div>

          {/* Gender */}
          <div className="mt-4">
            <label className="block mb-1.5 text-sm text-white/90">Gender</label>
            <select
              {...register("gender", { required: "Choose gender" })}
              className="w-full p-3 bg-white/3 border border-white/6 rounded-xl focus:outline-none focus:ring-1 focus:ring-sky-400 "
              disabled={submitted}
            >
              <option value="">Select gender</option>
              <option value="male"  className="text-gray-700">Male</option>
              <option value="female" className="text-gray-700">Female</option>
              
            </select>
            {errors.gender && (
              <p className="text-red-400 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Sports - circular styled checkboxes */}
          <div className="mt-4">
            <label className="block mb-2 text-sm text-white/90">Sports (choose any)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {SPORTS_OPTIONS.map((s) => (
                <label
                  key={s}
                  className="flex items-center gap-3 text-sm text-white/90 p-2 rounded-xl bg-white/2 border border-white/5 hover:bg-white/3 transition"
                >
                  <input
                    type="checkbox"
                    value={s}
                    {...register("sports")}
                    className="custom-circle-checkbox"
                    disabled={submitted}
                  />
                  <span className="capitalize">{s}</span>
                </label>
              ))}
            </div>
            <p className="text-sm text-sky-200/80 mt-2">{selectedSports.length} selected</p>
          </div>

          {/* Image Upload */}
          <div className="mt-4">
            <label className="block mb-2 text-sm text-white/90">College id  (required)</label>
            <div className="flex items-center gap-4">
              <label className="flex flex-col items-center px-4 py-2 bg-white/3 border border-white/6 rounded-xl cursor-pointer hover:bg-white/4">
                <span className="text-sm text-white/90">Choose image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  disabled={submitted}
                />
              </label>

              <div className="w-24 h-24 rounded-lg overflow-hidden border border-white/6 bg-white/4 flex items-center justify-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-xs text-white/60">No image</span>
                )}
              </div>
            </div>

            <input
              {...register("image", {
                validate: (file) => {
                  if (!file) return true;
                  if (!ALLOWED_TYPES.includes(file.type))
                    return "Only JPG/PNG/WEBP allowed";
                  if (file.size > MAX_FILE_SIZE) return "Image must be ≤ 5MB";
                  return true;
                },
              })}
              type="hidden"
            />
            {errors.image && (
              <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
            )}
            <p className="text-xs text-white/60 mt-2">Allowed: JPG/PNG/WEBP — Max: 5MB</p>
          </div>

          {/* server messages */}
          {error && (
            <p className="text-red-400 mt-4">
              {typeof error === "string" ? error : JSON.stringify(error)}
            </p>
          )}
          {success && (
            <p className="text-green-400 mt-4">
              {success.message ?? "Submitted successfully"}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || isSubmitting || submitted}
            className={`mt-6 w-full py-3 rounded-xl text-black font-semibold transition shadow-lg ${
              submitted || loading || isSubmitting
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-400 to-indigo-400 hover:from-sky-300 hover:to-indigo-500"
            }`}
          >
            {submitted ? "Submitted" : loading || isSubmitting ? "Submitting..." : "Register"}
          </button>

          <p className="text-xs text-white/60 mt-3 text-center">
            Note: status will be set by coordinator (defaults to <code>pending</code>).
          </p>
        </form>
      </div>

      <Footer />

      {/* Styles for circular checkboxes and small UI touches */}
      <style>{`
        /* make checkboxes circular & stylish */
        .custom-circle-checkbox {
          /* reset default appearance */
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 9999px;
          border: 2px solid rgba(255,255,255,0.18);
          background: transparent;
          position: relative;
          display: inline-block;
          vertical-align: middle;
          transition: all 140ms ease;
        }
        .custom-circle-checkbox:checked {
          background: linear-gradient(90deg, #06b6d4, #7c3aed);
          border-color: rgba(255,255,255,0.12);
          box-shadow: 0 6px 18px rgba(124,58,237,0.18), 0 2px 6px rgba(6,182,212,0.08);
        }
        .custom-circle-checkbox:focus {
          outline: none;
          box-shadow: 0 0 0 4px rgba(6,182,212,0.08);
        }
        /* small check dot inside when checked */
        .custom-circle-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 10px;
          height: 10px;
          background: rgba(255,255,255,0.95);
          border-radius: 9999px;
          opacity: 0.95;
        }
        /* disabled look */
        .custom-circle-checkbox:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}
