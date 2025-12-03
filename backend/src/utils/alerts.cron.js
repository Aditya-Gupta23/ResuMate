import cron from "node-cron";
import axios from "axios";
import {User} from "../models/user.model.js";

export function startAlertCron() {
  cron.schedule("0 9 * * *", async () => {
    console.log("Running daily job alert cron...");

    const users = await User.find({ "jobAlert.enabled": true });

    for (const user of users) {
      try {
        await axios.post("http://localhost:5050/api/alerts/send", {
          q: user.jobAlert.keywords,
          location: user.jobAlert.location,
          email: user.email
        });

        console.log(`Alert sent to: ${user.email}`);
      } catch (err) {
        console.error(`Failed for ${user.email}`, err.message);
      }
    }

    console.log("Alert cron completed");
  });
}
