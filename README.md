# ResuMate

## Overview
**ResuMate** is an AI-powered resume and job assistance platform designed to help users **create, analyze, and improve resumes** while actively assisting in the job search process.

It combines **resume building**, **AI-based job matching**, **interview preparation**, and a **sample job portal with alerts** into a single system.

---

## Key Features

- **Resume Builder**
  - Create resumes using **multiple professional templates**
  - Easy-to-edit sections (education, skills, experience, projects)
  - Export-ready resumes

- **AI Resume Analysis**
  - Analyze resumes against a **specific job role**
  - Skill-gap identification
  - ATS-friendly suggestions

- **AI Interview Preparation**
  - AI-generated **role-specific interview questions**
  - Practice using realistic sample questions

- **Job Portal**
  - Browse sample job listings
  - Apply for them 

- **Daily Job Alerts**
  - Automated job alerts based on user preferences
  - Email notifications for relevant roles

---

## Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT
- **AI Services:** Google Gemini API
- **Email Services:** Nodemailer
- **Cron Jobs:** Daily alerts & background tasks

---

## Project Setup

### Clone the Repository
```bash
git clone https://github.com/<your-username>/ResuMate.git
cd ResuMate

Install Dependencies
Backend
cd backend
npm install

Frontend
cd frontend
npm install

Create a .env file inside the backend folder.

backend/.env
PORT=5050
MONGO_URI=
MONGO_DB_NAME=
JWT_SECRET=write_a_secret_key_of_your_own_or_leave_it_like_this
JWT_REFRESH_SECRET=write_a_secret_key_of_your_own_or_leave_it_like_this
ACCESS_TOKEN_TTL=15m
REFRESH_TOKEN_TTL=7d
CLIENT_URL=http://localhost:5173

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM="ResuMate <no-reply@resumate.app>"

VITE_GOOGLE_CLIENT_ID=Your_client_id
GOOGLE_CALLBACK_URL=
GOOGLE_CLIENT_SECRET=Your_client_secret
GEMINI_API_KEY=Your_Key

JSEARCH_API_KEY= Your_api_key
JSEARCH_API_HOST=jsearch.p.rapidapi.com
