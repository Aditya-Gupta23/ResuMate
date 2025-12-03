import jobAlert from "../../models/jobAlert.model.js";

export async function isJobAlreadySent(id){
    return !!(await jobAlert.findOne({externalId:id}).lean());
}

export async function saveJob(job){
    try {
        await jobAlert.create({
            externalId:job.id,
            title:job.title,
            company:job.comapny,
            location:job.location,
            url:job.url,
            postedAt:job.postedAt,
            source: job.source,
        })
    } catch (error) {
        if (error.code !== 11000) throw error;
    }
}