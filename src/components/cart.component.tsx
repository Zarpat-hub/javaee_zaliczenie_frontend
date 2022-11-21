import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Api } from "../api/Api";
import { Product } from "./products-cards.component";

export const Cart: React.FC = () => {
  const idArray = localStorage.getItem("cart")?.split(",");
  const [message, setMessage] = useState<string>("");

  const handleOrder = () => {
    try {
      Api.makeOrder(idArray!.map((i) => Number(i))).then(() => {
        setMessage("Order made succesfully");
        localStorage.removeItem("cart");
        document.location.reload();
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  const renderCartItem = (id: number) => {
    const [product, setProduct] = useState<Product>({});

    Api.getProduct(id).then((res) => {
      setProduct({
        id: res.id,
        name: res.name,
        price: res.price,
        image: res.image,
      });
    });

    return (
      <React.Fragment>
        <Card className="py-2 mt-3 mb-3">
          <Card.Body>
            <h5>
              {product.name} {product.price}
            </h5>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  };

  const renderEmptyCart = () => {
    return (
      <React.Fragment>
        <h1>Cart is empty. Add some product!</h1>
      </React.Fragment>
    );
  };

  const renderCart = () => {
    return (
      <React.Fragment>
        {idArray?.map((s) => renderCartItem(parseInt(s)))}
        <Button
          type="submit"
          className="btn btn-success"
          onClick={() => handleOrder()}
        >
          Zamow!
        </Button>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {idArray === null ? renderEmptyCart() : renderCart()}
      {message === null ? "" : <h1>{message}</h1>}
    </React.Fragment>
  );
};
