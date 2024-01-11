import React, { useEffect, useState } from 'react'
import { Link, useParams, useHistory } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'

import Loader from '../components/Loader'
import axios from 'axios'
import AddProduct from '../components/AddProduct'

const ProductScreen = ({ match, location }) => {
  const id = location.search.split('=')[1]

  const hist = useHistory()

  const [product, setProduct] = useState({})
  const [qty, setQty] = useState(1)
  const [modal, setModal] = useState(false)


  const fetchProduct = async () => {
    const { data } = await axios.get(`/api2/product/view?ID=${id}`)
    console.log(data[0])
    const d = data[0]
    setProduct(data)
  }

  


  const addToCartHandler = async () => {
    console.log(qty, Object.values(product).at(0).productID)
    await axios.post('/api3/cart/add', {
      productID: Object.values(product).at(0).productID,
      quantity: qty,
      price: Object.values(product).at(0).price,
      sellerID: Object.values(product).at(0).sellerID
    },
      {
        withCredentials: true,
      })
      .then(function (response) {
        console.log(response.data);
        hist.push('/cart')
      })
      .catch(function (error) {
        console.log(error);
      });



  }

  useEffect(() => {
  
    fetchProduct()
  }, [modal])

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link className='btn btn-light my-3' to='/'>
          Go Back
        </Link>
      </div>

      {modal && <AddProduct modal={modal} setModal={setModal} product={Object.values(product).at(0)} update={true} />}

      

      {console.log(Object.keys(product).length)}
      {!Object.keys(product).length ? (
        <Loader />
      ) : (
       
        <Row>
          {console.log(Object.values(product).at(0))}
          <Col md={6}>
            <Image src={Object.values(product).at(0).image.path} alt={Object.values(product).at(0).image.path} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{Object.values(product).at(0).name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                {Object.values(product).at(0).category}
              </ListGroup.Item>
              
              <ListGroup.Item>Price: Tk. {Object.values(product).at(0).price}</ListGroup.Item>
              <ListGroup.Item>
                {Object.values(product).at(0).description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>Tk. {Object.values(product).at(0).price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {Object.values(product).at(0).countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {Object.values(product).at(0).countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as='select'
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {/* [0,1,2....countInStock] */}
                          {[...Array(Object.values(product).at(0).countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1} kg
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    style={{ marginLeft: '25%' }}
                    onClick={addToCartHandler}
                    className='btn-block'
                    type='button'
                    disabled={Object.values(product).at(0).countInStock === 0 || !localStorage.getItem('user')} // or supplier logged in
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
            <br />
            {
              JSON.parse(localStorage.getItem('user')).customerID  === Object.values(product).at(0).sellerID && <div>
                <Button variant="info" size='md' onClick={e => setModal(true)} style={{ marginLeft: '20%' }}
                >Update product</Button>
              </div>
            }
          </Col>
        </Row>
      )}
    </>
  )
}


export default ProductScreen
