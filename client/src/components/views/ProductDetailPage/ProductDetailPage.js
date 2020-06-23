import React, { useEffect, useState } from 'react'
import { string } from "prop-types"
import { Row, Col } from "antd"
import { getProduct } from "../../../functions"
import ProductImage from "./ProductImage"
import ProductInfo from "./ProductInfo"

export default function ProductDetailPage({ match: { params: { productId }} }) {
  const [product, setProduct] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProduct(productId)
      setProduct(res[0])
    }
    
    fetchData()
  }, [])

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
          <ProductInfo detail={product} />
        </Col>
      </Row>
    </div>
  )
}

ProductDetailPage.propTypes = {
  productId: string
}
