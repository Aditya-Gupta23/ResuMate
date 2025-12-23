import { scrapeNaukriJobs } from "../services/scraper/naukri.scraper.js";
import {isJobAlreadySent,saveJob} from "../services/jobs/jobStorage.services.js"
import {sendJobAlertEmail} from "../utils/email.service.js"

export const triggerJobAlerts= async(req,res)=>{
    try {
        const { q = "software engineer", location = "India", email } = req.body;
        const scrapedJobs=await scrapeNaukriJobs(q,location);
        
        const newJobs=[];

        for(const jobs of scrapedJobs)
        {
            if(!(await isJobAlreadySent(jobs.id))){
                await saveJob(jobs)
                newJobs.push(jobs);
            }
        }
        if(newJobs.length>0){
            await sendJobAlertEmail(email,newJobs)
        }
        return res.json({
            message: "Job alerts processed",
            sent: newJobs.length,
            newJobs
        });

    } catch (error) {
        console.error("Alert Error:", error);
        res.status(500).json({ error: "Job alert failed" });
    }
}