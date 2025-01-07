import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  useLocation
} from 'react-router-dom'
import './App.css'

// Home Page
const Home = () => {
  return (
    <div className='page'>
      <h1>Home Page</h1>
      <Link className='link' to='/login'>
        Go to Login
      </Link>
    </div>
  )
}

// Login Page
const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/cars')
  }

  return (
    <div className='page'>
      <h1>Login Page</h1>
      <input type='text' placeholder='Phone Number' />
      <input type='password' placeholder='Password' />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

// Cars Table Page
const CarsTable = () => {
  const navigate = useNavigate()

  const cars = [
    { id: 1, name: 'Tesla Model S', price: '$80,000' },
    { id: 2, name: 'BMW X5', price: '$70,000' },
    { id: 3, name: 'Audi A6', price: '$60,000' }
  ]

  const handleCarClick = car => {
    navigate(`/cars/${car.id}`, { state: car })
  }

  return (
    <div className='page'>
      <h1>Cars Table</h1>
      <ul>
        {cars.map(car => (
          <li className='car-item' key={car.id}>
            <button onClick={() => handleCarClick(car)}>
              {car.name} - {car.price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Single Car Page
const OneCarPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const car = location.state

  return (
    <div className='page'>
      <h1>Car Details</h1>
      <p>ID: {id}</p>
      <p>Name: {car?.name || 'No Name Provided'}</p>
      <p>Price: {car?.price || 'No Price Provided'}</p>
    </div>
  )
}

// Not Found Page
const NotFound = () => {
  return (
    <div className='page'>
      <h1>404 - Page Not Found</h1>
      <p className='notFound-p'>The page you are looking for does not exist.</p>
      <Link className='linkNotFound' to='/'>Go Back to Home</Link>
    </div>
  )
}

// App Component
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cars' element={<CarsTable />} />
        <Route path='/cars/:id' element={<OneCarPage />} />
        {/* Not Found Page */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
