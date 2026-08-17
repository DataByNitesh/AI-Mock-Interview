import mongoose from "mongoose";

const InterviewSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    Role: {
      type: String,
      default: "Candidate",
      required: true,
    },

    Difficulty: {
      type: String,
      default: "Beginner",
    },

    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
    },

    Questions: [
      {
        question: {
          type: String,
          required: true,
        },

        answer: {
          type: String,
          trim: true,
        },

        score: {
          type: Number,
        },

        skipped: {
          type: Boolean,
          default: false,
        },
      },
    ],

    overallScore: {
      type: Number,
    },

    overallFeedback: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Interview", InterviewSchema);
