# 🚀 SkillNova Backend (CV Builder API)

A complete backend system for building professional CVs with authentication, CV management, skill analysis, and PDF download feature.

---

## ✨ Features

- 🔐 User Register & Login (JWT Authentication)
- 🛡 Protected Routes (Middleware)
- 📝 Create / Read / Update / Delete CV
- 📄 Download CV as PDF
- 🎯 Skill Gap Analysis
- 👤 User-specific CV system

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (Authentication)
- bcrypt (Password Hashing)
- PDFKit (PDF Generation)
- dotenv

---

## 📂 Project Structure


src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── db/
├── index.js


---

## 🚀 API Endpoints

### 🔐 Auth


POST /api/users/register
POST /api/users/login


---

### 📝 CV (Protected)


POST /api/users/cv
GET /api/users/cv
PUT /api/users/cv/:id
DELETE /api/users/cv/:id


---

### 📄 Download CV (PDF)


GET /api/users/cv/download


Header Required:


Authorization: Bearer <token>


---

### 🎯 Skill Analysis


POST /api/users/analyze


---

## 🔑 Environment Variables

Create `.env` file:


PORT=8000
MONGODB_URI=your_mongodb_url
DB_NAME=your_db_name
ACCESS_TOKEN_SECRET=your_secret_key
ACCESS_TOKEN_EXPIRY=1d


---

## 🚀 Run Project


npm install
npm run dev


---

## 📌 Workflow

1. Register user
2. Login → get token
3. Create CV (with token)
4. Get CV
5. Download CV as PDF

---

## 👩‍💻 Author

Nisha Yadav

---

## 📌 Status

✅ Backend Completed  
🚀 Ready for Frontend Integration  