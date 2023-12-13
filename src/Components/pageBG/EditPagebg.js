import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditPagebg = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});

  useEffect(() => {
    axios
      .get(`${domain}/allPagebg`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const singleUser = data.find((item) => item.id == params.id);

  useEffect(() => {
    if (data.length > 0 && singleUser) {
      setId(singleUser.id || "");
      setTitle(singleUser.title || "");
      setFile(singleUser.image || "");
    }
  }, [data, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title);
    formData.append("file", file);
  // Log form data
  console.log("Form Data:");
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });
    axios
      .post(`${domain}/updatePagebg/`, formData)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate("/page-bg");
        }
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
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="Name">
                <Form.Label>Page Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={singleUser?.title}
                  disabled
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                <img
                  className="img-fluid my-2"
                  src={`${domain}/uploads/${singleUser?.image}`}
                  alt=""
                  style={{ width: "400px", borderRadius: "10px" }}
                />
              </Form.Group>
              <Button variant="success" type="submit" className="mt-2">
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPagebg;
