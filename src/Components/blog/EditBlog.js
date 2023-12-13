import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);

  useEffect(() => {
    axios
      .get(`${domain}/blog`)
      .then((res) => {
        setData(res.data.blogs);
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
      setContent(singleUser.description || "");
    }
  }, [data, params.id, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title);
    formData.append("content", content);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    axios
      .post(`${domain}/updateblog/`, formData)
      .then((res) => {
        console.log(res);
        navigate("/blog");
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
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="content">
                <Form.Label>Content</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  defaultValue={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  multiple
                />
              </Form.Group>
              <Button type="submit" className="mt-2">
                Create Blog Post
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditBlog;
