import express from 'express';
import {exploreMars} from "../controllers/ExploreMarsController";

const router = express.Router();

// explore mars route
router.post('/exploreMars', exploreMars);

export default router;
