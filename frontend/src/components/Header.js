import React, { useEffect, useState } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'


const Header = () => {

  // const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user) 
  // hist = useHistory() 

  const [user, setUser] = useState(null)
  const [supplier, setSupplier] = useState(null)


  const history = useHistory()
  const clickHandlerOUT = async () => {


    await axios.get('/api3/user/signout', {
      withCredentials: true
    })
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          localStorage.removeItem('user');
          setUser("")
          history.push('/')
          window.history.go(0)
        }

      })
      .catch(function (error) {
        console.log(error);
        alert(error.response.data.error)
      });



  }

  const getUser = () => {

    if (!user === true && localStorage.getItem('user')) {
      setUser(JSON.parse(localStorage.getItem('user')))

    }
    if (!supplier === true && localStorage.getItem('supplier'))
      setSupplier(JSON.parse(localStorage.getItem('supplier')))
  }

  useEffect(() => {
  

    getUser()
  }, [user, supplier])

  useEffect(() => {
    return history.listen((location) => {
      console.log(`You changed the page to: ${location.pathname}`)
      getUser()
    })
  }, [history])
 


  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect style={{ minHeight: '100px' }}>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand><b>Buy Bank</b></Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className="ms-auto" >



              <LinkContainer to='/cart'>
                <Nav.Link >
                  <i className='fas fa-shopping-cart' > Cart</i>
                </Nav.Link>
              </LinkContainer>


              <LinkContainer to='/profile'>
                <Nav.Link >
                  <i className='fas fa-user' > Profile</i>
                </Nav.Link>
              </LinkContainer>

              <>
                {localStorage.getItem('user') ? <Nav.Link >
                  <i className='fas fa-sign-out-alt' onClick={clickHandlerOUT} > Sign out</i>
                </Nav.Link> :
                  <LinkContainer to='/login'>
                    <Nav.Link>

                      <i className='fas fa-sign-in-alt' > Sign in</i>

                    </Nav.Link>
                  </LinkContainer>
                }


              </>


            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
