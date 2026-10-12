import { Route, Routes } from "react-router"
import Homepage from './pages/Homepage'
import StudentList from './pages/StudentsList'
import CreateStudent from "./pages/CreateStudent"
import StudentDetails from "./pages/StudentDetails"
import Navbar from "./components/Navbar"
import EditStudent from "./pages/EditStudent"
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:studentId" element={<StudentDetails />} />
        <Route path="/students/create" element={<CreateStudent />} />
        <Route path="/students/:studentId/edit" element={<EditStudent />} />
      </Routes>
    </div>
  )
}

export default App