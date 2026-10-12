# 🚀 React Router & API Guide | دليل التوجيه والربط مع الـ API

A complete bilingual guide (English & العربية) explaining **React Router** and **Axios API Integration** with real code examples from this lesson.

دليل شامل باللغتين العربية والإنجليزية لشرح **React Router** وربطه مع الـ **API (Axios)** مع أمثلة عملية من هذا الدرس.

---

## 📑 Table of Contents | الفهرس
1. [Overview | نظرة عامة](#1-overview--نظرة-عامة)
2. [Setup BrowserRouter | إعداد BrowserRouter](#2-setup-browserrouter--إعداد-browserrouter)
3. [Defining Routes | تعريف المسارات والصفحات](#3-defining-routes--تعريف-المسارات-والصفحات)
4. [Navigation with Link | التنقل باستخدام Link](#4-navigation-with-link--التنقل-باستخدام-link)
5. [Fetching & Listing Data | جلب وعرض البيانات (List)](#5-fetching--listing-data--جلب-وعرض-البيانات-list)
6. [Dynamic Routing & useParams | المسار الديناميكي وتفاصيل العنصر](#6-dynamic-routing--useparams--المسار-الديناميكي-وتفاصيل-العنصر)
7. [Environment Variables | المتغيرات البيئية (.env)](#7-environment-variables--المتغيرات-البيئية-env)
8. [Quick Cheatsheet | ملخص سريع للمفاهيم](#8-quick-cheatsheet--ملخص-سريع-للمفاهيم)

---

## 1. Overview | نظرة عامة

- **React Router** allows us to create Single Page Applications (SPAs) with multiple views/pages without refreshing the browser.
- **Axios** is used to fetch data from a backend REST API.

- **React Router:** يسمح لنا بإنشاء تطبيق صفحة واحدة (SPA) يحتوي على صفحات وروابط متعددة بدون إعادة تحميل المتصفح (No page refresh).
- **Axios:** مكتبة لإرسال طلبات الـ HTTP (مثل GET و POST) والتواصل مع الـ Backend.

---

## 2. Setup BrowserRouter | إعداد BrowserRouter

In `src/main.jsx`, we wrap `<App />` with `<BrowserRouter>` so the entire application has routing capabilities.

في ملف `src/main.jsx`، نغلّف مكون التطبيق `<App />` بـ `<BrowserRouter>` حتى يتمكن التطبيق بالكامل من استخدام ميزات التوجيه.

```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router' // 👈 استيراد BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

---

## 3. Defining Routes | تعريف المسارات والصفحات

In `src/App.jsx`, we define the paths and which component renders for each path using `<Routes>` and `<Route>`.

في ملف `src/App.jsx`، نحدد الروابط والمكونات التي تظهر عند زيارة كل رابط باستخدام `<Routes>` و `<Route>`.

```jsx
// src/App.jsx
import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import StudentList from "./pages/StudentsList"
import CreateStudent from "./pages/CreateStudent"
import StudentDetails from "./pages/StudentDetails"

function App() {
  return (
    <div>
      {/* Navbar appears on all pages | يظهر في كل الصفحات */}
      <Navbar />

      {/* Routes Switcher | مبدل الصفحات */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/create" element={<CreateStudent />} />
        {/* Dynamic Route (:studentId is a parameter) | مسار ديناميكي */}
        <Route path="/students/:studentId" element={<StudentDetails />} />
      </Routes>
    </div>
  )
}

export default App
```

---

## 4. Navigation with Link | التنقل باستخدام Link

Never use regular `<a href="...">` in React Router because it refreshes the page! Instead, use `<Link to="...">`.

لا نستخدم وسم `<a href="...">` العادي في React لأنه يعيد تحميل الصفحة بالكامل! نستخدم بدلاً منه `<Link to="...">`.

```jsx
// src/components/Navbar.jsx
import { Link } from "react-router"

function Navbar() {
  return (
    <nav>
      <Link to='/'>Homepage</Link>
      <Link to='/students'>All Students</Link>
      <Link to='/students/create'>Create new Student</Link>
    </nav>
  )
}

export default Navbar
```

---

## 5. Fetching & Listing Data | جلب وعرض البيانات (List)

In `src/pages/StudentsList.jsx`, we follow 3 steps:
1. `useState` to store the array of data.
2. `useEffect` with `axios.get` to fetch the data when the page loads.
3. `.map()` inside JSX to loop over items and display each one with a unique `key` and `<Link>`.

في `src/pages/StudentsList.jsx`، نتبع 3 خطوات أساسية:
1. `useState` لحفظ مصفوفة البيانات القادمة من السيرفر.
2. `useEffect` مع `axios.get` لجلب البيانات بمجرد فتح الصفحة.
3. `.map()` داخل الـ JSX للمرور على كل طالب وعرضه مع `key` فريد ورابط `Link` لصفحة التفاصيل.

```jsx
// src/pages/StudentsList.jsx
import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router"

function StudentsList() {
  const [students, setStudents] = useState([])

  // 1. Fetch function | دالة جلب البيانات
  async function getAllStudents() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`)
    setStudents(response.data)
  }

  // 2. Run once on component mount | تشغيل الدالة مرة واحدة عند تحميل الصفحة
  useEffect(() => {
    getAllStudents()
  }, [])

  // 3. Render list: div -> map -> key -> content -> Link
  return (
    <div>
      <h1>Students Details</h1>
      {students.map((oneStudent) => (
        <div key={oneStudent._id}>
          <h2>Name: {oneStudent.name}</h2>
          <h2>Course: {oneStudent.course}</h2>
          {/* Link to specific student details | رابط لتفاصيل هذا الطالب تحديداً */}
          <Link to={`/students/${oneStudent._id}`}>See more about {oneStudent.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default StudentsList
```

---

## 6. Dynamic Routing & useParams | المسار الديناميكي وتفاصيل العنصر

When the route is `/students/:studentId`:
- We use the `useParams()` hook to read the `studentId` from the URL.
- We make an axios request to fetch ONLY that student's details.

عندما يكون المسار `/students/:studentId`:
- نستخدم الـ hook المسمى `useParams()` لقراءة قيمة `studentId` من الرابط.
- نرسل طلب عبر `axios.get` لجلب تفاصيل هذا الطالب تحديداً بالـ `id` الخاص به.

```jsx
// src/pages/StudentDetails.jsx
import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router" // 👈 لاستخراج المتغيرات من الرابط

function StudentDetails() {
  // Extract studentId from URL params (/students/:studentId)
  const { studentId } = useParams()
  const [oneStudent, setOneStudent] = useState(null)

  async function getOneStudent() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${studentId}`)
    setOneStudent(response.data)
  }

  useEffect(() => {
    getOneStudent()
  }, [studentId])

  return (
    <div>
      {oneStudent ? (
        <>
          <h1>Student Details</h1>
          <p>Name: {oneStudent.name}</p>
          <p>Course: {oneStudent.course}</p>
        </>
      ) : (
        <p>Loading student details...</p>
      )}
    </div>
  )
}

export default StudentDetails
```

---

## 7. Environment Variables | المتغيرات البيئية (.env)

In Vite, environment variables in the `.env` file must begin with `VITE_`:

في Vite، أي متغير في ملف `.env` يجب أن يبدأ بـ `VITE_`:

```env
# .env
VITE_API_URL=https://omar-ga-class.onrender.com
```

To access it in code:
للوصول إليه داخل الكود:
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 8. Quick Cheatsheet | ملخص سريع للمفاهيم

| Element / Hook | Purpose (English) | الغرض (بالعربية) |
|---|---|---|
| `<BrowserRouter>` | Wraps the application to enable routing | يغلّف التطبيق لتفعيل التوجيه في المتصفح |
| `<Routes>` | Container for all `<Route>` definitions | حاوية تجمع كل مسارات التطبيق |
| `<Route path="..." element={<... />} />` | Connects a specific URL to a React component | يربط رابطاً معيناً بمكون وصفحة React |
| `<Link to="...">` | Navigates without page reload | رابط للتنقل بين الصفحات بدون إعادة تحميل |
| `useParams()` | Reads dynamic parameters from URL (e.g. `:studentId`) | يقرأ المتغيرات الديناميكية من الرابط |
| `useNavigate()` | Programmatically redirects user (e.g. `navigate('/students')`) | يوجه المستخدم برمجياً بعد عملية مثل إنشاء عنصر |
| `useEffect(() => {}, [])` | Runs API calls once when component loads | ينفذ دوال جلب البيانات بمجرد فتح الصفحة |
