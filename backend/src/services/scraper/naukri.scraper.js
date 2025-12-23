import {chromium} from "playwright";

export async function scrapeNaukriJobs(query="Software engineers",location="India",maxResults=15){
    const browser=await chromium.launch({headless:true})
    const page=await browser.newPage();
    const q = query.replace(/\s+/g, "-");
    const loc = location.replace(/\s+/g, "-");
    const url = `https://www.naukri.com/${q}-jobs-in-${loc}`;

    await page.goto(url,{waitUntil:"domcontentloaded"})

    const job=await page.evaluate((max)=>{
        return [...document.querySelectorAll(".jobTuple")].slice(0,max).map((el)=>{
            const title=el.querySelector("a.title")?.innerText?.trim();
            const company=el.querySelector(".subTitle")?.innerText?.trim();
            const location=el.querySelector(".location")?.innerText?.trim();
            const link = el.querySelector("a.title")?.href;

            return{
            id:link,
            title,
            company,
            location,
            url:link,
            source: "naukri",
            postedAt: new Date()
            };
        });
    },maxResults);
     await browser.close();
    return job;
}