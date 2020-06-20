import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import { RocketOutlined } from "@ant-design/icons"
import { getProducts } from "../../../functions"
import ProductCard from "./ProductCard"

function LandingPage() {
  const [products, setProducts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const res = await getProducts()
      setProducts(res.products)
    }
    fetchData()
  }, [])

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Lets Travel Anywhere <RocketOutlined />
        </h2>
      </div>
      {/* Filter */}

      {/* Search */}
      {products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>NO post yet...</h2>
        </div>
      ) : (
        <div>
          <Row gutter={[16, 16]}>
            {products.map((p) => (
              <Col lg={6} md={8} xs={24} key={p._id}>
                <ProductCard product={p} />
              </Col>
            ))}
          </Row>
        </div>
      )}
      <br />
      <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button>Load More</button>
      </div>
    </div>
  )
}

export default LandingPage
