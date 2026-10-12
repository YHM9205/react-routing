import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams, Link, useNavigate } from "react-router"
function StudentDetails() {
  const { studentId } = useParams()
  const [oneStudent, setOneStudent] = useState(null)
  const navigate = useNavigate()
  async function getOneStudent() {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${studentId}`)
    setOneStudent(response.data)
  }
  function deleteStudent() {
    axios.delete(`${import.meta.env.VITE_API_URL}/students/${studentId}`)
    navigate('/students')
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
          <p>City: {oneStudent.city}</p>
          <Link to='/students'>Back to all students</Link>
          <br />
          <Link to={`/students/${studentId}/edit`}>Edit student</Link>
          <button onClick={deleteStudent}>Delete student</button>
          <br />
          <button onClick={() => { navigate(`/students`) }}>All Students</button>
          <button onClick={() => { navigate(`/`) }}>Homepage</button>
          <button onClick={() => { navigate(`/students/create`) }}>Create Student</button>
        </>
        :
        <p>no student found</p>
      }
    </div>
  )
}

export default StudentDetails