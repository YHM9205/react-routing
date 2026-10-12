import { Route, Routes } from "react-router"
import Homepage from './pages/Homepage'
import StudentList from './pages/StudentsList'
import CreateStudent from "./pages/CreateStudent"
import Navbar from "./components/Navbar"
import StudentDetails from "./pages/studentDetails"
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/:studentId" element={<StudentDetails />} />
      </Routes>
    </div>
  )
}

export default App