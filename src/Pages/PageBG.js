import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const PageBG = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState({});
  const [allPagesBg, setAllPagesBg] = useState([]);
  const [deleteData, setDeleteData] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("file", file);

    axios
      .post(`${domain}/createPagebg`, formData)
      .then((res) => {
        setData(res);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${domain}/allPagebg`)
      .then((res) => {
        setAllPagesBg(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteData, data]);

  //   delete user
  const handleClick = (id) => {
    axios
      .post(`${domain}/deletePagebg/`, {id: id})
      .then((res) => {
        setDeleteData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const pageCat = [
    {
      id: 0,
      title: "Work",
      value: "work"
    },
    {
      id: 1,
      title: "People",
      value: "people"
    },
    {
      id: 2,
      title: "Practise",
      value: "practise"
    },
    {
      id: 3,
      title: "Future Collegue",
      value: "future_collegue"
    },
    {
      id: 4,
      title: "Contact",
      value: "contact"
    }
  ];

  const filteredListData = pageCat.filter((item) => {
    return !allPagesBg.some((tableItem) => tableItem.title === item.value);
  });

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <Form className="row" onSubmit={handleSubmit}>
              <Col lg={6}>
                <Form.Group controlId="title">
                  <Form.Label>Page Title</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option>Open this select menu</option>
                    {filteredListData.map((item) => (
                      <option key={item.id} value={item.value}>
                        {item.title}
                      </option>
                    ))}
                  </Form.Select>
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
                <Button type="submit" className="mt-2 w-100">
                  Add
                </Button>
              </Col>
            </Form>
          </Col>
          <Col lg={12} className="mt-5">
            <h4>Page Wise Background List</h4>
            <Table striped bordered hover>
              <thead>
                <tr className="text-center">
                  <td>ID</td>
                  <td>Title</td>
                  <td>Image</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {allPagesBg &&
                  allPagesBg.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>
                        <img
                          className="img-fluid mx-2"
                          src={`${domain}/uploads/${item.image}`}
                          alt=""
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>
                        <Link
                          to={`/page-bg/${item.id}`}
                          className="btn btn-primary me-2"
                        >
                          Edit
                        </Link>
                        <Button
                          onClick={() => handleClick(item.id)}
                          className="btn btn-danger"
                          role="button"
                          type="submit"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageBG;
