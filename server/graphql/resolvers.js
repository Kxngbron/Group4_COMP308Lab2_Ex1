import bcrypt from "bcryptjs";
import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";
import { signToken } from "../utils/jwt.js";
import { requireAuth } from "../middleware/auth.js";

export const resolvers = {
  Query: {
    students: async () => Student.find().populate("courses"),
    courses: async () => Course.find(),
    me: async (_, __, ctx) => {
      if (!ctx.user) return null;
      return Student.findById(ctx.user.id).populate("courses");
    },
    myCourses: async (_, __, ctx) => {
      requireAuth(ctx);
      const student = await Student.findById(ctx.user.id).populate("courses");
      return student?.courses ?? [];
    },
    studentsByCourse: async (_, { courseId }) => {
      return Student.find({ courses: courseId }).populate("courses");
    }
  },

  Mutation: {
    signup: async (_, { input }) => {
      const exists = await Student.findOne({
        $or: [{ studentNumber: input.studentNumber }, { email: input.email }]
      });
      if (exists) throw new Error("Student number or email already exists");

      const hashed = await bcrypt.hash(input.password, 10);

      const student = await Student.create({
        ...input,
        password: hashed,
        courses: []
      });

      const token = signToken({ id: student._id.toString(), studentNumber: student.studentNumber });
      return { token, student: await Student.findById(student._id).populate("courses") };
    },

    login: async (_, { studentNumber, password }) => {
      const student = await Student.findOne({ studentNumber }).populate("courses");
      if (!student) throw new Error("Invalid credentials");

      const ok = await bcrypt.compare(password, student.password);
      if (!ok) throw new Error("Invalid credentials");

      const token = signToken({ id: student._id.toString(), studentNumber: student.studentNumber });
      return { token, student };
    },

    addCourse: async (_, { input }, ctx) => {
      requireAuth(ctx); // optional (teacher might want only logged-in users)
      return Course.create(input);
    },

    updateCourse: async (_, { courseId, input }, ctx) => {
      requireAuth(ctx);
      const updated = await Course.findByIdAndUpdate(courseId, input, { new: true });
      if (!updated) throw new Error("Course not found");
      return updated;
    },

    deleteCourse: async (_, { courseId }, ctx) => {
      requireAuth(ctx);
      const deleted = await Course.findByIdAndDelete(courseId);
      return !!deleted;
    },

    enrollCourse: async (_, { courseId }, ctx) => {
      requireAuth(ctx);

      const course = await Course.findById(courseId);
      if (!course) throw new Error("Course not found");

      const student = await Student.findById(ctx.user.id);
      if (!student) throw new Error("Student not found");

      const already = student.courses.some((c) => c.toString() === courseId);
      if (!already) student.courses.push(courseId);

      await student.save();
      return Student.findById(student._id).populate("courses");
    },

    dropCourse: async (_, { courseId }, ctx) => {
      requireAuth(ctx);

      const student = await Student.findById(ctx.user.id);
      if (!student) throw new Error("Student not found");

      student.courses = student.courses.filter((c) => c.toString() !== courseId);
      await student.save();

      return Student.findById(student._id).populate("courses");
    }
  },

  Student: {
    id: (parent) => parent._id.toString()
  },
  Course: {
    id: (parent) => parent._id.toString()
  }
};