import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav>
      <Link to="/routines">Routines</Link>
      <Link to="/activities">Activities</Link>
    </nav>
  )
}

export default Navbar