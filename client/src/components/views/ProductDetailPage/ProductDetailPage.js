import React, { useEffect, useState } from 'react'
import { string } from "prop-types"
import { useDispatch } from "react-redux"
import { Row, Col } from "antd"
import { getProduct } from "../../../functions"
import ProductImage from "./ProductImage"
import ProductInfo from "./ProductInfo"
import { addToCart } from "../../../_actions/user_actions"

export default function ProductDetailPage({ match: { params: { productId }} }) {
  const dispatch = useDispatch()

  const [product, setProduct] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProduct(productId)
      setProduct(res[0])
    }
    
    fetchData()
  }, [productId])

  const addToCartHandler = (productId) => {
    dispatch(addToCart(productId))
  }

  return (
    <div className="post__page" style={{ width: "100%", padding: "3rem 4rem" }}>
      <div style={{ display: "flex", justifyContent: "center"}}>
        <h1>{product.title}</h1>
      </div>
      <br />
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <ProductImage detail={product} />
        </Col>
        <Col lg={12} xs={24} detail={product} >
          <ProductInfo detail={product} addToCart={addToCartHandler} />
        </Col>
      </Row>
    </div>
  )
}

ProductDetailPage.propTypes = {
  productId: string
}
