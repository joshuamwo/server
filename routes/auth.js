import express from "express";

const router = express.Router();

//controllers
import { register } from "../controllers/auth";

//routes

router.post("/register", register);

//native way of exporting router in nodeJs
module.exports = router;
