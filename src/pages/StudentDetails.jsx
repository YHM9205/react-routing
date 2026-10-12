import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router"
function StudentDetails() {
  const { studentId } = useParams()
  const [oneStudent, setOneStudent] = useState(null)

  async function getOneStudent() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${studentId}`)
    setOneStudent(response.data)
  }
  useEffect(() => {
    getOneStudent()
  }, [])

  return (
    <div>
      {oneStudent ?
        <>
          <h1>Student Details</h1>
          <p>Name: {oneStudent.name}</p>
          <p>Course: {oneStudent.course}</p>
        </>
        :
        <p>no student found</p>
      }
    </div>
  )
}

export default StudentDetails