import { askGemini, evaluateInterview } from "../utils/gemini.js";
import Interview from "../models/Interview.js";

export const InterviewQuestions = async (req, res) => {
  try {
    const { role, difficulty, questionCount } = req.body;

    if (!role || !difficulty || !questionCount) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (questionCount < 1 || questionCount > 10) {
      return res.status(400).json({
        message: "Question count must be between 1 and 10",
      });
    }

    const questions = await askGemini(
      `Generate ${questionCount} interview questions for a ${difficulty} level ${role} interview.`,
    );

    const interview = await Interview.create({
      User: req.user._id,
      Role: role,
      Difficulty: difficulty,
      Questions: questions,
    });

    return res.status(201).json({
      message: "Interview created successfully",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const SubmitAnswer = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionIndex, answer } = req.body;

    if (questionIndex === undefined || !answer || !answer.trim()) {
      return res.status(400).json({
        message: "Question and answer are required",
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    if (interview.User.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to access this interview",
      });
    }

    if (interview.status === "completed") {
      return res.status(400).json({
        message: "Interview has already been completed",
      });
    }

    if (!interview.Questions[questionIndex]) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    interview.Questions[questionIndex].answer = answer.trim();
    interview.Questions[questionIndex].skipped = false;

    await interview.save();

    return res.status(200).json({
      message: "Answer saved successfully",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const SkipQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionIndex } = req.body;

    if (questionIndex === undefined) {
      return res.status(400).json({
        message: "Question index is required",
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    if (interview.User.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to access this interview",
      });
    }

    if (interview.status === "completed") {
      return res.status(400).json({
        message: "Interview has already been completed",
      });
    }

    if (!interview.Questions[questionIndex]) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    interview.Questions[questionIndex].skipped = true;

    await interview.save();

    return res.status(200).json({
      message: "Question skipped successfully",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const finishInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    if (interview.User.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to access this interview",
      });
    }

    if (interview.status === "completed") {
      return res.status(400).json({
        message: "Interview has already been completed",
      });
    }

    const questionValidation = interview.Questions.every(
      (q) => (q.answer && q.answer.trim()) || q.skipped === true,
    );

    if (!questionValidation) {
      return res.status(400).json({
        message: "Please answer or skip every question before finishing",
      });
    }

    const evaluationData = interview.Questions.map((q, index) => ({
      questionIndex: index,
      question: q.question,
      answer: q.answer,
    })).filter((q) => q.answer && q.answer.trim());

    if (evaluationData.length === 0) {
      return res.status(400).json({
        message: "Answer at least one question before finishing",
      });
    }

    const evaluation = await evaluateInterview(evaluationData);

    evaluation.evaluations.forEach(({ questionIndex, score }) => {
      if (interview.Questions[questionIndex]) {
        interview.Questions[questionIndex].score = score;
      }
    });

    interview.overallScore = evaluation.overallScore;
    interview.overallFeedback = evaluation.overallFeedback;
    interview.status = "completed";

    await interview.save();

    return res.status(200).json({
      message: "Interview evaluated successfully",
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getmyInterview = async (req, res) => {
  try {
    const interviews = await Interview.find({
      User: req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      interviews,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getInterview = async (req, res) => {
  try {
    const { id } = req.params;

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found",
      });
    }

    if (interview.User.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to access this interview",
      });
    }

    return res.status(200).json({
      interview,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};
