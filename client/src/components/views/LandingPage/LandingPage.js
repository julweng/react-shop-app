import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import { RocketOutlined } from "@ant-design/icons"
import { getProducts } from "../../../functions"
import ProductCard from "./ProductCard"

function LandingPage() {
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [postSize, setPostSize] = useState()
  const LIMIT = 1

  useEffect(() => {
    const fetchData = async () => {
      const data = {
        skip,
        limit: LIMIT
      }

      const res = await getProducts(data)
      if (res.success) {
        loadProducts(data.loadMore, res.products)
        setPostSize(res.postSize)
      }
    }
    fetchData()
  }, [])

  const loadProducts = (loadMore, loadedProducts) => {
    if (loadMore) {
      const [loaded] = loadedProducts
      setProducts([...products, loaded])
    }
    setProducts(loadedProducts)
  }

  const onLoadMore = async () => {
    let skipNum = skip + LIMIT

    const data = {
      skip: skipNum,
      limit: LIMIT,
      loadMore: true
    }

    const res = await getProducts(data)
    loadProducts(data.loadMore, res.products)
    setSkip(skipNum)
  }
  console.log(products)
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
      {postSize >= LIMIT && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  )
}

export default LandingPage
