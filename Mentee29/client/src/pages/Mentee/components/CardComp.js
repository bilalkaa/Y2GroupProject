import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function cardu(props) {
    return (
      <Card bg={props.backgroundC} style={{ flex: 1, width:"14em", margin:"2.5em"} }>
        <Card.Img variant="top" src={props.src} style={{ width: "12em" }} />
        <Card.Body>
          <Card.Title>
            <Link to={props.path}>
              <Button variant="primary" to={props.path}>
                {props.btnTitle}{" "}
              </Button>
            </Link>
          </Card.Title>
          <Card.Text>{props.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  }