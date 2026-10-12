import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router'

function EditStudent() {
  const { studentId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    city: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    async function getOneStudent() {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/students/${studentId}`)
      const { name, course, city } = response.data
      setFormData({ name, course, city })
    }
    getOneStudent()
  }, [studentId])

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/students/${studentId}`, formData)
      navigate(`/students/${studentId}`)
    } catch (error) {
      console.error('Error updating student:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1>Edit Student</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="course">Course:</label>
        <input
          type="text"
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          required
        />
        <br />

        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <br />

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}

export default EditStudent
