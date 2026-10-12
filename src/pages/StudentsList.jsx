import { useState, useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router"
function StudentsList() {
  const [students, setStudents] = useState([])

  async function getAllStudents() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students`)
    setStudents(response.data)
    console.log('function called')
  }
  useEffect(() => {
    getAllStudents()
  }, [])

  return (
    <div>
      <h1>Students Details</h1>
      {students.map((oneStudent) => (
        <div key={oneStudent._id}>
          <h2>name: {oneStudent.name}</h2>
          <h2>course: {oneStudent.course}</h2>
          <Link to={`/students/${oneStudent._id}`}>See more about {oneStudent.name}</Link>
        </div>
      ))}

    </div>
  )

}

export default StudentsList