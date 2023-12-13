import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);

  useEffect(() => {
    axios
      .get(`${domain}/blog`)
      .then((res) => {
        // console.log(res.data);
        setData(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteData]);

  //   delete user
  const handleClick = (id) => {
    axios
      .post(`${domain}/deleteblog/`, {id: id})
      .then((res) => {
        console.log(res);
        setDeleteData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

console.log(data);

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center">Blog</h2>
              <Link to={"/create-blog"} className="btn btn-primary">
                Create new blog
              </Link>
            </div>
          </Col>
          <Col lg={12}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Content</td>
                  <td>Image</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.image.map((item, index)=>
                        <img key={index} className="img-fluid mx-2" src={`${domain}/uploads/${item}`} alt="" style={{width: "50px", height: "50px"}}/>
                      )}</td>
                      <td>
                        <Link
                          to={`/edit-blog/${item.id}`}
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
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <p className="text-center text-capitalize mb-0">
                        No data found
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BlogList;
