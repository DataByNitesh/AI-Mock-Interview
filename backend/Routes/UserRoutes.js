import express from "express";
import { Register, Login } from "../Controller/UserController.js";

const routes = express.Router();

routes.post("/register", Register);
routes.post("/login", Login);

export default routes;
