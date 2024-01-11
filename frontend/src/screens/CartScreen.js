import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import axios from 'axios'




const CartScreen = () => {


  let history = useHistory()

  const [cartItems, setCartItems] = useState([])
  const [products, setProducts] = useState([])
  const load = false


  const getCart = async () => {
    await axios.get('/api3/cart/view', {
      withCredentials: true,
    })
      .then(function (response) {
        console.log(response.data.cart);
        setCartItems([...response.data.cart])
        // setQty(response.data.cart)
      })
      .catch(function (error) {
        // console.log(error);

      });

    const { data } = await axios.get('/api2/product/view')
    // console.log(data)
    setProducts(data)
  }



  useEffect(() => {

    getCart()


  }, [load])




  const removeFromCartHandler = async (id) => {
    await axios.delete(`/api3/cart/remove?productid=${id}`, {
      withCredentials: true,
    })
      .then(function (response) {
        if (response.status) getCart()
      })
      .catch(function (error) {
        alert('Error occured during deleting item')
      });
  }


  const checkoutHandler = async () => {
    localStorage.setItem('amount', cartItems
      .reduce((acc, item) => acc + item.quantity * item.price, 0)
      .toFixed(2))
    history.push('/payment')



  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {!cartItems ? (
          <Message>
            Your cart is empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {/* {console.log(cartItems)} */}
            {console.log(products.filter(product => cartItems.find(item => item.productID === product.productID)))}
            {/* {console.log(cartItems.map(item => console.log(item.productID)))} */}
            {products.filter(product => cartItems.find(item => item.productID === product.productID)).map((item) => (
              <ListGroup.Item key={item.productID}>
                <Row >
                  <Col md={4}>
                    <Link to={`/product/view?ID=${item.productID}`}>
                      <Image src={item.image.path} fluid rounded style={{height:'80px', width:'130px'}} />
                    </Link>
                  </Col>

                  <Col md={2} style={{ paddingTop: '30px' }}>
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                  </Col>
                  {console.log(item.productID)}
                  <Col md={2} style={{ paddingTop: '30px' }}>Tk. {item.price}</Col>
                  <Col md={2} style={{ paddingTop: '20px' }}>
                    {console.log(cartItems.find(i => i.productID === item.productID).quantity)}
                    <Form.Control
                      as='select'
                      value={cartItems.find(i => i.productID === item.productID).quantity}
                      // onChange = {(e)=> }
                      readOnly
                    >       
                      {[...Array(cartItems.find(i => i.productID === item.productID).quantity).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1} kg
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2} style={{ paddingTop: '20px' }}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.productID)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({products.filter(product => cartItems.find(item => item.productID === product.productID)).reduce((acc, item) => acc + cartItems.find(i => i.productID === item.productID).quantity, 0)})
                items
              </h2>
              Tk.&nbsp;
              {products.filter(product => cartItems.find(item => item.productID === product.productID))
                .reduce((acc, item) => acc + cartItems.find(i => i.productID === item.productID).quantity * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  )
}


export default CartScreen