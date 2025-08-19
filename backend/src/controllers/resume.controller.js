import Resumes from '../models/resume.model.js'

export const createReusme=async (req,res)=>{
    try {
        const {title}=req.body
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume=await Resumes.create({
            userId:req.user._id,
            title,
            ...defaultResumeData,
            ...req.body
        })
        res.status(201).json(newResume)
    } catch (error) {
        res.status(500).json({message:"Failed to create resume"})
    }
}

export const getUserResumes=async(req,res)=>{
    try {
        const resume=await Resumes.findOne({userId:req.user._id}).sort({
            updatedAt:-1
        })
        res.json(resume)
    } catch (error) {
        return res.status(500).json({message:"Failed to find resume"})

    }
}

export const getResumeById=async(req,res)=>{
    try {
        const resume=await Resumes.findOne({_id:req.params.id,userId:req.user._id});
        if(!resume) return res.status(404).json({message:"Resume not found"});
        return res.json(resume)
    } catch (error) {
        return res.status(500).json({message:"Failed to find resume"})
    }
}

export const updateResume=async(req,res)=>{
    try {
        const resume=await Resume.findOne({
            _id:req.params.id,
            userId:req.user._id
        })
        if(!resume){
            return res.status(404).json({message:"Resume not found or not aurthorized"});
        }
        Object.assign(resume,req.body)
        const savedResume=await resume.save();
        res.json(savedResume)
    } catch (error) {
        return res.status(500).json({message:"Failed to update resume"})
    }
}

export const deleteResume=async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}