import axios from "axios"

// export async function fetchJobsFromJsearch({query="software engineer",location="India",page=1,results_per_page=20}){

//     const url = `https://${process.env.JSEARCH_API_HOST}/search`;

//     const options = {
//         params:{
//             query:`${query} in ${location}`,
//             page:page.toString()
//         },
//         headers:{
//             "x-rapidapi-key":process.env.JSEARCH_API_KEY,
//             "x-rapidapi-host":process.env.JSEARCH_API_HOST,
//         },
//         timeout:10000
//     };
//     const {data}=await axios.get(url,options);
//     if(!data || !data.data) return [];

//    return data.data.map((job) => ({
//     id: job.job_id,
//     title: job.job_title,
//     company: job.employer_name,
//     location: job.job_country || job.job_city,
//     description: job.job_description,
//     url: job.job_apply_link,
//     salary: job.job_min_salary || null,
//     postedAt: job.job_posted_at_datetime_utc,
//     source: "jsearch",
//   }));
// }
export async function fetchJobsFromJsearch({query="software engineer",location="India",page=1}) {
  const url = `https://${process.env.JSEARCH_API_HOST}/search`;

  const options = {
    params: {
      query: `${query} in ${location}`,
      page: page.toString(),
      num_pages: "1",
      country: "in",
      date_posted: "all",
    },
    headers: {
      "x-rapidapi-key": process.env.JSEARCH_API_KEY,
      "x-rapidapi-host": process.env.JSEARCH_API_HOST,
    },
  };
  try {
      const { data } = await axios.get(url, options);
      if (!data || !data.data) return [];

        return data.data.map(job => ({
            id: job.job_id,
            title: job.job_title,
            company: job.employer_name,
            location: job.job_country || job.job_city,
            description: job.job_description,
            url: job.job_apply_link,
            postedAt: job.job_posted_at_datetime_utc,
            source: "jsearch",
        }));
  } catch (error) {
    console.log("Error getting the urls in jsearch ",error);
  }


  
}
