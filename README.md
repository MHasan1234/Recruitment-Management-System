# Recruitment Management System Backend

This is a backend server for a Recruitment Management System, built as part of a backend developer assignment.  
It is developed using Node.js, Express, and MongoDB, providing a RESTful API for managing users, job postings, and applications.

The system supports two user roles — **Admin** and **Applicant** — each with distinct permissions.

---

## Features

- User Authentication: Secure registration and login using JWT (JSON Web Tokens).  
- Role-Based Access Control: Different permissions for Admin and Applicant.  
- Resume Uploads: Applicants can upload resumes (PDF/DOCX only) using Multer.  
- Resume Parsing: Integrates with apilayer.com API to extract key resume details (skills, education, experience).  
- Job Management: Admins can create, update, and view job openings.  
- Application System: Applicants can view and apply for open jobs.

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Server | Node.js, Express |
| Database | MongoDB (Mongoose) |
| Authentication | JSON Web Token (jsonwebtoken), bcrypt.js |
| File Handling | multer |
| API Calls | axios |

---

## Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/MHasan1234/Recruitment-Management-System.git
cd Recruitment-Management-System
2. Install Dependencies
bash
Copy code
npm install
3. Create Environment File
Create a .env file in the project root and add the following variables:

bash
Copy code
# Server Port
PORT=5000

# MongoDB Connection
MONGO_URI=your_mongodb_connection_string_here

# JWT Secret
JWT_SECRET=your_strong_jwt_secret_key

# Resume Parser API
RESUME_API_KEY=0bWeisRWoLj3UdXt3MXMSMWptYFIpQfS
RESUME_API_URL=https://api.apilayer.com/resume_parser/upload
4. Run the Server
bash
Copy code
npm start
The server will start running at:
http://localhost:5000

API Endpoints
Auth Routes (/auth)
POST /auth/signup
Create a new user.

Body (JSON):

json
Copy code
{
  "name": "Full Name",
  "email": "user@example.com",
  "password": "password123",
  "userType": "Applicant",
  "profileHeadline": "Software Developer",
  "address": "123 Main St"
}
POST /auth/login
Authenticate a user and receive a JWT token.

Body (JSON):

json
Copy code
{
  "email": "user@example.com",
  "password": "password123"
}
User Routes (/user)
POST /user/uploadResume
Upload a resume file for an authenticated applicant.

Auth: Applicant token required
Body: form-data

Key	Value
resume	(file) your_resume.pdf

Job Routes (/jobs)
GET /jobs
Fetch all available job openings.

Auth: Any authenticated user token required

GET /jobs/apply
Apply for a specific job.

Auth: Applicant token required
Query Parameter:
?job_id={job_id}

Admin Routes (/admin)
All Admin routes require an Admin user token.

POST /admin/job
Create a new job opening.

Body (JSON):

json
Copy code
{
  "title": "Senior NodeJS Developer",
  "description": "Looking for a dev with 5 years of experience.",
  "companyName": "Tech Corp"
}
GET /admin/job/:job_id
Fetch details for a single job, including the list of applicants.

GET /admin/applicants
Fetch all users with the Applicant role.

GET /admin/applicant/:applicant_id
Fetch the detailed profile of a specific applicant, including parsed resume data.
