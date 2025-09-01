import express from 'express'
import { requireAuth } from '../middleware/auth.middleware.js'
import { createReusme, deleteResume, getResumeById, getUserResumes, updateResume } from '../controllers/resume.controller.js'
import { uploadResumeImages } from '../controllers/uploadImages.controller.js'

const resumeRouter=express.Router()
resumeRouter.post('/',requireAuth,createReusme)
resumeRouter.get('/',requireAuth,getUserResumes)
resumeRouter.get('/:id',requireAuth,getResumeById)

resumeRouter.put('/:id',requireAuth,updateResume)
resumeRouter.put('/:id/upload-images',requireAuth,uploadResumeImages)

resumeRouter.delete('/:id',requireAuth,deleteResume)

export default resumeRouter