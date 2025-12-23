import { fetchJobsFromJsearch } from "../services/api/jsearch.js";

export const getJobs= async (req,res)=>{
    try {
        const {q="software engineer",location="India",page=1}=req.query;
        const jobs = await fetchJobsFromJsearch({ query: q, location, page });
        return res.json(jobs);
    } catch (error) {
        console.error("JSearch Error:", error.message);
        return res.status(500).json({ error: `Failed to fetch jobs ${error}` });   
    }
}
