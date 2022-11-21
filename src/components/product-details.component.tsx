import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Api } from "../api/Api";
import { isAdminFunc } from "./nav-menu.component";
import { Product, ProductCard } from "./products-cards.component";

export const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>({});
  let navigate = useNavigate();

  Api.getProduct(parseInt(id as string)).then((res) => {
    setProduct({
      id: res.id,
      name: res.name,
      price: res.price,
      image: res.image,
    });
  });

  const handleDelete = (id: number) => {
    Api.deleteProduct(id).then((res) => {
      location.href = "/products";
    });
  };

  const handleAddToCart = (id: number) => {
    if (localStorage.getItem("cart") === null) {
      localStorage.setItem("cart", id.toString());
    } else {
      localStorage.setItem(
        "cart",
        localStorage.getItem("cart")!.concat(`,${id.toString()}`)
      );
    }
  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col className="col-4 py-5">
          <ProductCard
            id={parseInt(id as string)}
            name={product.name}
            price={product.price}
            image={product.image}
          ></ProductCard>
          <Button
            className="mt-3 py-2"
            onClick={() => handleAddToCart(parseInt(id!))}
          >
            Dodaj do koszyka
          </Button>
          {isAdminFunc() && (
            <Button
              className="mt-3 py-2"
              onClick={() => navigate(`/productUpdate/${id}`)}
            >
              Edytuj
            </Button>
          )}
          {isAdminFunc() && (
            <Button
              className="mt-3 py-2"
              onClick={() => handleDelete(id as unknown as number)}
            >
              Usun
            </Button>
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};
