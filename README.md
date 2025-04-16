# 📊 Expense Tracker App

A full-stack MERN application to track daily, monthly, and categorized expenses. The app supports currency conversion, filtering, authentication, and detailed analytics with a modern UI.

---

## 🚀 Features

- ✅ User registration and login (JWT-based)
- ✅ Add, edit, and delete expenses
- ✅ Filter expenses by category, date range
- ✅ Currency conversion (INR, LKR, USD, and more)
- ✅ Monthly expense summary with year/month selector
- ✅ Responsive UI with Tailwind CSS
- ✅ Redux Toolkit for global state management
- ✅ Protected routes and token-based access
- ✅ Dark mode UI (tailwind-based)
- ✅ csv Download option
- ✅ Smooth scrollable dropdowns for long currency lists
- ✅ Loading indicators and user-friendly messages

---

## 📁 Folder Structure

```
ExpenseTracker/
│
├── client/          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── utils/
│
├── server/          # Express Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── utils/
│
└── README.md
```

---

## 🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS, Redux Toolkit
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT (JSON Web Tokens)
- **Other:** Axios, dotenv, bcrypt

---

## 🧑‍💻 Getting Started

### 1. **Clone the repo**

```bash
git clone https://github.com/jazimahmed/ExpenseTracker.git
cd ExpenseTracker
```

### 2. **Set up Backend**

```bash
cd backend
npm install
touch .env
nodemon server.js
```

Add the following in `.env`:

```
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```
### 3. **Set up frontend**

```bash
cd frontend
npm install
npm run dev
```


## 📸 Screenshots

![Dashboard Screenshot](https://i.ibb.co/k6W9bvCj/app-dash-2.png)
![Mobile View or Second Screenshot](https://i.ibb.co/s9bkKGt0)

---

---

## 🙌 Author

**Jazim Ahmed**  
📧 mohamedjazim800@gmail.com  
🔗 [GitHub](https://github.com/jazimahmed)

---

## ⭐ Give a Star!

If you found this helpful or interesting, feel free to star the repo ✨
