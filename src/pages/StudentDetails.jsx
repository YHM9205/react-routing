import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams, Link } from "react-router"

function StudentDetails() {
  const { studentId } = useParams()
  const [oneStudent, setOneStudent] = useState(null)

  async function getOneStudent() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${studentId}`)
      setOneStudent(response.data)
    } catch (error) {
      console.error('Error fetching student details:', error)
    }
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
          <p>City: {oneStudent.city}</p>
          <Link to='/students'>Back to all students</Link>
          <br />
          <Link to={`/students/${studentId}/edit`}>Edit student</Link>
        </>
      ) : (
        <p>no student found</p>
      )}
    </div>
  )
}

export default StudentDetails