import express from 'express';
import {streamController,infoController} from "../controllers/streamController.js"

const router = express.Router();    


router.get('/', streamController)
router.get('/info',infoController)



export default router