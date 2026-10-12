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
      {students.map((oneStudent) => (
        <div key={oneStudent._id}>
          <p>Name: {oneStudent.name}</p>
          <Link to={`/students/${oneStudent._id}`}>Go to Student Details</Link>
        </div>
      ))}
    </div>
  )
}

export default StudentsList


// 1. send GET request to api
// 2. set the state to the response from api
// 3. map through all the students to show to the user
