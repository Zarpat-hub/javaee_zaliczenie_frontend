import React, { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Api } from "../api/Api";

export type Product = {
  id?: number;
  name?: string;
  price?: number;
  image?: Uint8Array;
};

export type ProductList = {
  products: Product[];
};

export const ProductCard: React.FC<Product> = ({ id, name, price, image }) => {
  let navigate = useNavigate();

  return (
    <React.Fragment>
      <Card as="button" onClick={() => navigate(`/products/${id}`)}>
        <Card.Img
          variant="top"
          className="align-self-center"
          src={`data: image/jpeg; base64, ${image}`}
        ></Card.Img>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{price} PLN</Card.Text>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};

export const ProductCardList: React.FC<ProductList> = (
  products: ProductList
) => {
  const rows: Product[][] = products.products.reduce(
    (rows: any, key, index) =>
      (index % 4 == 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows,
    []
  );
  const [wantedName, setWantedName] = useState<string>("");
  let navigate = useNavigate();
  return (
    <React.Fragment>
      <Form>
        <Form.Group>
          <Form.Label>Wyszukaj produkt po nazwie</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setWantedName(e.target.value)}
          ></Form.Control>
          <Form.Control
            type="submit"
            as="button"
            onClick={() => navigate(`/product/like/${wantedName}`)}
          >
            Szukaj
          </Form.Control>
        </Form.Group>
      </Form>
      {rows.map((row: Product[]) => (
        <Row className="justify-content-around">
          {row.map((col: Product) => (
            <Col className="col-2 py-3">
              <ProductCard
                id={col.id}
                name={col.name}
                price={col.price}
                image={col.image}
              />
            </Col>
          ))}
        </Row>
      ))}
    </React.Fragment>
  );
};
