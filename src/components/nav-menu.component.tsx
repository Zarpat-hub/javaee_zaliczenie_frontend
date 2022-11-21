import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { Api, User } from "../api/Api";

const renderNavMenu = () => {
  return (
    <React.Fragment>
      <Nav.Item className="ms-5 me-1">
        <Nav.Link
          className="btn btn-info bg-opacity-25 text-light"
          eventKey="link-1"
          href="/login"
        >
          Zaloguj
        </Nav.Link>
      </Nav.Item>
      <Nav.Item className="ms-3 me-5">
        <Nav.Link
          className="btn btn-info bg-opacity-25 text-light"
          eventKey="link-2"
        >
          Zarejestruj
        </Nav.Link>
      </Nav.Item>
    </React.Fragment>
  );
};

export const isAdminFunc = () => {
  if (localStorage.getItem("username") === null) return false;

  const [user, setUser] = useState<User>({});
  useEffect(() => {
    Api.getCurrentUserDetails(
      localStorage.getItem("username")!.toString()
    ).then((res) => {
      setUser(res);
      console.log(user);
    });
  }, []);

  return user.roles !== undefined
    ? user.roles[0]!.name! === "ROLE_ADMIN"
      ? true
      : false
    : false;
};

const renderHello = () => {
  return (
    <React.Fragment>
      {isAdminFunc() && (
        <Nav.Item className="ms-auto me-5">
          <Nav.Link
            className="btn btn-info bg-opacity-25 text-light"
            href="/addProduct"
          >
            Dodaj produkt
          </Nav.Link>
        </Nav.Item>
      )}
      <Nav.Item className="ms-auto">
        <Nav.Link
          className="btn btn-info bg-opacity-25 text-light ms-3 me-5"
          eventKey="link3"
          href="/cart"
        >
          Koszyk
        </Nav.Link>
      </Nav.Item>
      <h5 className="me-5">Hello {localStorage.getItem("username")}</h5>
      <Nav.Item className="ms-5 me-2">
        <Nav.Link
          className="btn btn-info bg-opacity-25 text-light"
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            document.location.reload();
          }}
        >
          Wyloguj
        </Nav.Link>
      </Nav.Item>
    </React.Fragment>
  );
};

export const NavMenu: React.FC<{}> = () => {
  return (
    <Nav className="py-3 border-bottom border-3 bg-primary bg-opacity-25">
      <Nav.Item className="ms-5">
        <Nav.Link
          className="btn btn-info bg-opacity-25 text-light"
          href="/products"
        >
          Strona główna
        </Nav.Link>
      </Nav.Item>
      {localStorage.getItem("username") === null
        ? renderNavMenu()
        : renderHello()}
    </Nav>
  );
};
