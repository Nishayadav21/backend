import mongoose from "mongoose";

const cvSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    education: [
      {
        degree: { type: String, default: "" },
        college: { type: String, default: "" },
        year: { type: String, default: "" },
      },
    ],

    experience: [
      {
        company: { type: String, default: "" },
        position: { type: String, default: "" },
        duration: { type: String, default: "" },
      },
    ],

    skills: {
      type: [String],
      default: [],
    },

    projects: [
      {
        title: { type: String, default: "" },
        description: { type: String, default: "" },
      },
    ],

    languages: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const CV = mongoose.model("CV", cvSchema);

export default CV;