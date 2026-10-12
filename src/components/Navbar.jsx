import { Link } from "react-router"
function Navbar() {
  return (
    <div>
      <Link to='/'>Homepage</Link>
      <br />
      <Link to='/students'>All Students</Link>
      <br />
      <Link to='/students/create'>Create new Student</Link>
      <br />
    </div>
  )
}

export default Navbar