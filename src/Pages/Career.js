import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Career = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${domain}/career`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteData]);

  //   delete user
  const handleClick = (id) => {
    axios
      .post(`${domain}/deletecareer/`,{id: id})
      .then((res) => {
        setDeleteData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items == null) {
      navigate("login");
    }
  }, []);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center title">Career Page</h2>

              <Link to={"/create-career"} className="btn btn-primary">
                New Career add
              </Link>
            </div>
          </div>
          <div className="col-12">
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <td colSpan={1}>ID</td>
                  <td colSpan={1}>Title</td>
                  <td colSpan={1}>Vacancy</td>
                  <td colSpan={1}>Description</td>
                  <td colSpan={1}>Education</td>
                  <td colSpan={1}>Salary</td>
                  <td colSpan={1}>Action</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td colSpan={1}>{item.id}</td>
                      <td colSpan={1}>{item.title}</td>
                      <td colSpan={1}>{item.vacancy}</td>
                      <td colSpan={1}>{item.description}</td>
                      <td colSpan={1}>{item.education}</td>
                      <td colSpan={1}>{item.salary}</td>
                      <td colSpan={1}>
                        <Link
                          to={`/edit-career/${item.id}`}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
