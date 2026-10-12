import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'

function CreateStudent() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    course: '',
    city: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await axios.post(`${import.meta.env.VITE_API_URL}/students`, formData)
      navigate('/students') // navegait is redirecting user to /students page after the student is created 
      //this happens in the browser without refreshing the page
      //in react we can control the navigation programmatically 
      //useNavigate is a hook that is used to navigate programmatically
      //we can use it to navigate to any page we want
      // to arabic copy?

    } catch (error) {
      console.error('Error creating student:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <h1>Create Student</h1>

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
          {isSubmitting ? 'Creating...' : 'Create Student'}
        </button>
      </form>
    </div>
  )
}

export default CreateStudent