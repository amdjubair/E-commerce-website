import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import RegisterScreen from './screens/RegisterScreen'
import LoginScreen from './screens/LoginScreen'
import LogoutScreen from './screens/LogoutScreen'
import CartScreen from './screens/CartScreen'
import toast, { Toaster } from 'react-hot-toast'
import ProfileScreen from './screens/ProfileScreen'

const App = () => { 
  return ( 
    <>
    <Toaster />
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/view' component={ProductScreen} />
          <Route path='/login' component={LoginScreen}></Route>
          <Route path='/logout' component={LogoutScreen}></Route>
          <Route path='/register' component={RegisterScreen}></Route>
          <Route path='/cart' component = {CartScreen}></Route>
          <Route path='/profile' component={ProfileScreen} />
        </Container>
      </main>
      {/* <Footer /> */}
    </Router>
    </> 
    
  )
}

export default App
