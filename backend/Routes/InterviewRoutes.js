import express from "express";
import { InterviewQuestions,SubmitAnswer,finishInterview,getmyInterview,getInterview,SkipQuestion } from "../Controller/InterviewController.js";
import { protect } from "../middleware/userMiddleware.js";

const routes = express.Router();

routes.post("/create",protect, InterviewQuestions);
routes.post("/:id/answer", protect, SubmitAnswer);
routes.post("/:id/finish", protect, finishInterview);
routes.get("/my-interviews", protect, getmyInterview);
routes.post("/:id/skip", protect, SkipQuestion);
routes.get("/:id", protect, getInterview);

export default routes;
