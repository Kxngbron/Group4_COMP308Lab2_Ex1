import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    studentNumber: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, // hashed
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    program: { type: String, required: true, trim: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
  },
  { timestamps: true }
);

export const Student = mongoose.model("Student", studentSchema);