import React from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom'
import './App.css'

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
const Login = () => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate('/cars')
  }
  return (
    <div className='page'>
      <h1>Login</h1>
      <input type='text' placeholder='Phone Number' />
      <input type='password' placeholder='Password' />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

const CarsTable = () => {
  const navigate = useNavigate()

  const cars = [
    { id: 1, name: 'Tesla Model S', price: '80,000' },
    { id: 2, name: 'BMW X5       ', price: '70,000' },
    { id: 3, name: 'Audi A6', price: '60,000' }
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
            <button className='btn-car' onClick={() => handleCarClick(car)}>
              {car.name}- ${car.price}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const OneCardPage = () => {
  const { id } = useParams()
  const location = useLocation()
  const car = location.state

  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className='page'>
      <h1>Car Details</h1>
      <p>ID: {id}</p>
      <p>Name: {car?.name || 'No Name Provided'}</p>
      <p>Price: {car?.price || 'No Price Provided'}</p>

      <div>
        <button onClick={handleBack} className='btn-back'>
          Back
        </button>
      </div>
    </div>
  )
}

const NotFound = () => {
  return (
    <div className='page'>
      <h1>404 - Page Not Found </h1>
      <p className='notFound-p'>The page you are looking for does not exist.</p>
      <Link className='btn-not-found' to='/'>
        Go Back to Home
      </Link>
    </div>
  )
}

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cars' element={<CarsTable />} />
        <Route path='/cars/:id' element={<OneCardPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
