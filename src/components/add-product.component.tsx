import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Api } from "../api/Api";

export const ProductAdd: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [image, setImage] = useState<File>();

  const handleSubmit = () => {
    Api.postProduct({
      name: name,
      price: price as unknown as number,
      image: image!,
    });
  };

  return (
    <React.Fragment>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Nazwa produktu</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Cena</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zdjecie</Form.Label>
          <Form.Control
            as="input"
            type="file"
            onChange={(e) =>
              setImage((e!.target! as HTMLInputElement)!.files![0])
            }
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="submit"
            as="button"
            onClick={() => handleSubmit()}
          >
            Dodaj
          </Form.Control>
        </Form.Group>
      </Form>
    </React.Fragment>
  );
};
