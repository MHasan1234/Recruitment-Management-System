Recruitment Management System Backend

This is a backend server for a Recruitment Management System, built as part of a backend developer assignment. It is built with Node.js, Express, and MongoDB, and provides a RESTful API for managing users, job postings, and applications.

The system supports two user roles: Admin and Applicant, with different permissions for each.

Features

User Authentication: Secure user registration and login using JSON Web Tokens (JWT).

Role-Based Access Control: Separate permissions for Admin and Applicant roles.

Resume Uploads: Applicants can upload their resumes (PDF and DOCX only) using multer.

Resume Parsing: Integrates with a third-party API (apilayer.com) to parse uploaded resumes and extract key information (skills, education, experience) [cite: 7, 50-51].

Job Management: Admins can create and manage job openings.

Application System: Applicants can view and apply for open jobs.

Tech Stack

Server: Node.js, Express

Database: MongoDB (with Mongoose)

Authentication: jsonwebtoken, bcrypt.js

File Handling: multer

API Calls: axios

Installation & Setup

Follow these steps to get the project running on your local machine.

1. Clone the Repository

git clone [https://github.com/MHasan1234/Recruitment-Management-System.git](https://github.com/MHasan1234/Recruitment-Management-System.git)
cd Recruitment-Management-System


2. Install Dependencies

npm install


3. Create Environment File

Create a .env file in the root of the project and add the following variables.

# Port for the server to run on
PORT=5000

# Your MongoDB connection string
MONGO_URI=your_mongodb_connection_string_here

# A strong secret for signing JWTs
JWT_SECRET=your_strong_jwt_secret_key

# API Key and URL for the resume parser
RESUME_API_KEY=0bWeisRWoLj3UdXt3MXMSMWptYFIpQfS
RESUME_API_URL=[https://api.apilayer.com/resume_parser/upload](https://api.apilayer.com/resume_parser/upload)


4. Run the Server

npm start


The server will start running on http://localhost:5000.

API Endpoints

All API endpoints are documented below.

Auth Routes (Base: /auth)

POST /auth/signup

Creates a new user profile.

Body (JSON):

{
  "name": "Full Name",
  "email": "user@example.com",
  "password": "password123",
  "userType": "Applicant",
  "profileHeadline": "Software Developer",
  "address": "123 Main St"
}


POST /auth/login

Authenticates a user and returns a JWT token.

Body (JSON):

{
  "email": "user@example.com",
  "password": "password123"
}


User Routes (Base: /user)

POST /user/uploadResume

Uploads a resume file for the authenticated applicant.

Auth: Applicant token required.

Body: form-data

Key: resume

Value: (file) your_resume.pdf

Job Routes (Base: /jobs)

GET /jobs

Fetches all available job openings.

Auth: Any authenticated user token required.

GET /jobs/apply

Applies the authenticated applicant to a specific job.

Auth: Applicant token required.

Query Parameter: ?job_id={job_id}

Admin Routes (Base: /admin)

Note: All Admin routes require an Admin user token.

POST /admin/job

Creates a new job opening.

Body (JSON):

{
  "title": "Senior NodeJS Developer",
  "description": "Looking for a dev with 5 years of experience.",
  "companyName": "Tech Corp"
}


GET /admin/job/:job_id

Fetches details for a single job, including a list of applicants.

GET /admin/applicants

Fetches a list of all users with the Applicant user type.

GET /admin/applicant/:applicant_id

Fetches the detailed profile of a specific applicant, including their parsed resume data.
