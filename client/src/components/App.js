import React, { Suspense } from "react"
import { Route, Switch } from "react-router-dom"
import Auth from "../hoc/auth"
// pages for this product
import {
  Footer,
  HistoryPage,
  LandingPage,
  LoginPage,
  NavBar,
  ProductDetailPage,
  RegisterPage,
  ShoppingCart,
  UploadProductPage
} from "./views"

// Auth(component, boolean) 
// null  Anyone Can go inside
// true   only logged in user can go inside
// false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/product/upload"
            component={Auth(UploadProductPage, true)}
          />
          <Route
            exact
            path="/product/:productId"
            component={Auth(ProductDetailPage, null)}
          />
          <Route
            exact
            path="/user/cart"
            component={Auth(ShoppingCart, null)}
          />
          <Route exact path="/history" component={Auth(HistoryPage, true)} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  )
}

export default App
