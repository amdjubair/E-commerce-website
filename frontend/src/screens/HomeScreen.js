import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import Product from '../components/Product'
// import products from '../products'
import axios from 'axios'
import AddProduct from '../components/AddProduct'
import SearchBar from '../components/SearchBar'

const HomeScreen = () => {

  const [products, setProducts] = useState([])
  const [check, setCheck] = useState(false)
  const [user, setUser] = useState(null)
  const [modal, setModal] = useState(false)


  const fetchProducts = async () => {
    const { data } = await axios.get('/api2/product/view')

    setProducts(data)
    setCheck(true)

  }

  useEffect(() => {

    if (!check)
      fetchProducts()

  }, [products])

  return (
    <>
      <SearchBar placeholder="Search by name" data={products} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Products Feed</h1>

        <Button style={{ backgroundColor: '#162030' }} onClick={e => setModal(true)}>Add product</Button>

        {modal && <AddProduct modal={modal} setModal={setModal} product={null} update={false} />}
      </div>
      <Row>
        {/* {console.log(products)} */}
        {products.map((product) => (
          <Col key={product.productID} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} update={false} />
          </Col>
        ))}
      </Row>
      {/* {window.history.go(0)} */}
    </>
  )
}

export default HomeScreen
