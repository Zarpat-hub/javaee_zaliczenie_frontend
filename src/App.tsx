import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Api } from "./api/Api";
import "./App.css";
import {
  Product,
  ProductCard,
  ProductCardList,
  ProductList,
} from "./components/products-cards.component";
import { Container, Row, Col, Form } from "react-bootstrap";
import { Route, Router, Routes } from "react-router";
import { ProductDetails } from "./components/product-details.component";
import { BrowserRouter, useNavigate, useParams } from "react-router-dom";
import { LoginPage } from "./components/login.component";
import { ProductAdd } from "./components/add-product.component";
import { ProductUpdate } from "./components/edit-product.component";
import { Cart } from "./components/cart.component";

const listOfProducts: Product[] = await Api.getAllProducts();

export const WantedProducts: React.FC = () => {
  const { name } = useParams();
  const [productList, setProductList] = useState<Product[]>([]);

  Api.searchByName(name!.toString()).then((res) => {
    setProductList(res);
  });

  return (
    <React.Fragment>
      <ProductCardList products={productList!} />
    </React.Fragment>
  );
};

function App() {
  return (
    <Container fluid>
      <BrowserRouter>
        <Routes>
          <Route path={`/products/:id`} element={<ProductDetails />}></Route>
          <Route
            path={`/products`}
            element={<ProductCardList products={listOfProducts} />}
          ></Route>
          <Route path={`/login`} element={<LoginPage />}></Route>
          <Route path={`/addProduct`} element={<ProductAdd />}></Route>
          <Route
            path={`/productUpdate/:id`}
            element={<ProductUpdate />}
          ></Route>
          <Route path={`/cart`} element={<Cart />}></Route>
          <Route
            path={`/product/like/:name`}
            element={<WantedProducts />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
