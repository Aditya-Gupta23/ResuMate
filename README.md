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
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

OPENAI_API_KEY=your_openai_api_key

NODEMAILER_USER=your_mailtrap_username
NODEMAILER_PASSWORD=your_mailtrap_password

  
