import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Work = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    axios
      .get(`${domain}/work`)
      .then((res) => {
        setData(res.data.works);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteData]);

  //   delete user
  const handleClick = (id) => {
    axios
      .post(`${domain}/deletework/`,{ id: id })
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


console.log(data);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center title">Work Page</h2>
              <Link to={"/work-added"} className="btn btn-primary">
                Work data added
              </Link>
            </div>
          </div>
          <div className="col-12">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td>ID</td>
                  <td>Title</td>
                  <td>Description</td>
                  <td>Image</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td className="d-flex align-items-center justify-content-start flex-wrap gap-2">
                        {item.image.map((item, index) => (
                          <img
                            key={index}
                            className="img-fluid object-fit-cover"
                            src={`${domain}/uploads/${item}`}
                            alt=""
                            style={{ width: "50px", height: "50px" }}
                          />
                        ))}
                      </td>
                      <td>
                        <div className="d-flex align-items-center justify-content-start flex-wrap gap-2">
                          <Link
                            to={`/work-edit/${item.id}`}
                            className="btn btn-primary flex-grow-1"
                          >
                            Edit
                          </Link>
                          <Button
                            onClick={() => handleClick(item.id)}
                            className="btn btn-danger flex-grow-1"
                            role="button"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
        </div>
        {/* Work Page */}
      </div>
    </>
  );
};

export default Work;
