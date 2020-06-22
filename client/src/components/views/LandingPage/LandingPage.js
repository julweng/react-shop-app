import React, { useEffect, useState } from "react"
import { Row, Col } from "antd"
import { RocketOutlined } from "@ant-design/icons"
import { getProducts } from "../../../functions"
import ProductCard from "./ProductCard"
import CheckBox from "./CheckBox"
import RadioInput from "./RadioInput"
import SearchBar from "./SearchBar"
import { priceFilter } from "../constants"

function LandingPage() {
  const LIMIT = 2
  const [products, setProducts] = useState([])
  const [skip, setSkip] = useState(0)
  const [postSize, setPostSize] = useState()
  const [filters, setFilters] = useState({
    continents: [],
    price: []
  })
  const [searchTerm, setSearchTerm] = useState("")

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
    } else {
      setProducts(loadedProducts)
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
    setPostSize(res.postSize)
    setSkip(skipNum)
  }

  const showFilteredResults = async (filters) => {
    const data = {
      skip: 0,
      limit: LIMIT,
      filters
    }
    const res = await getProducts(data)
    loadProducts(data.loadMore, res.products)
    setSkip(0)
  }

  const handlePrice = (value) => {
    let array = []
    priceFilter.forEach((item) => {
      if (item._id === parseInt(value, 10)) {
        array = item.array
      }
    })

    return array
  }

  const handleFilters = (filter, category) => {
    const newFilters = { ...filters }

    if (category === "price") {
      const priceValues = handlePrice(filter)
      newFilters[category] = priceValues
    } else {
      newFilters[category] = filter
    }

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const updateSearchTerm = async (searchTerm) => {
    setSearchTerm(searchTerm)

    const data = {
      skip: 0,
      limit: LIMIT,
      filters,
      searchTerm
    }
    setSkip(0)
    const res = await getProducts(data)
    loadProducts(data.loadMore, res.products)
  }

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      <div style={{ textAlign: "center" }}>
        <h2>
          Lets Travel Anywhere <RocketOutlined />
        </h2>
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={12} xs={24}>
          <CheckBox
            handleFilters={(filters) => handleFilters(filters, "continents")}
          />
        </Col>
        <Col lg={12} xs={24}>
          <RadioInput
            handleFilters={(filters) => handleFilters(filters, "price")}
          />
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <SearchBar searchTerm={searchTerm} refreshFunction={updateSearchTerm} />
      </div>
      {products.length === 0 ? (
        <div
          style={{
            display: "flex",
            height: "300px",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h2>NO products posted yet...</h2>
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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1rem auto"
          }}
        >
          <button onClick={onLoadMore}>Load More</button>
        </div>
      )}
    </div>
  )
}

export default LandingPage
