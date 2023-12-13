import axios from "axios";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HomeAdded = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
  
    formData.append("companyName", companyName);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("googleMap", googleMap);
    
    // Append the file and files directly without converting to strings
    formData.append("file", file);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
  
    axios
      .post(`${domain}/createhome`, formData)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form className="row" onSubmit={handleSubmit}>
              <Col lg={6}>
                <Form.Group controlId="company_name">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="Google map">
                  <Form.Label>Google map</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setGoogleMap(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Button type="submit" className="mt-2 w-100">
                  Create new
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeAdded;
