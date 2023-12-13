import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const People = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [data, setData] = useState([]);
  const [deleteData, setDeleteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${domain}/people`)
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
      .post(`${domain}/deletepeople/`,{id: id})
      .then((res) => {
        setDeleteData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(localStorage.getItem("data"));

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
              <h2 className="text-center title">People Page</h2>

              <Link to={"/add-people"} className="btn btn-primary">
                Add New People
              </Link>
            </div>
          </div>
          <div className="col-12">
            <Table striped bordered hover responsive variant="dark">
              <thead>
                <tr>
                  <td colSpan={1}>ID</td>
                  <td colSpan={1}>Name</td>
                  <td colSpan={1}>Profile Image</td>
                  <td colSpan={1}>Designation</td>
                  <td colSpan={1}>Description</td>
                  <td colSpan={1}>Project Image</td>
                  <td colSpan={1}>Action</td>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((item, index) => (
                    <tr key={index}>
                      <td colSpan={1}>{item.id}</td>
                      <td colSpan={1}>{item.name}</td>
                      <td colSpan={1}>
                        {item.profileImage == null ? (
                          "No Image Uploaded"
                        ) : (
                          <>
                            <img
                              className="img-fluid mx-2"
                              src={`${domain}/uploads/${item.profileImage}`}
                              alt=""
                              style={{ width: "150px" }}
                            />
                          </>
                        )}
                      </td>
                      <td colSpan={1}>{item.designation}</td>
                      <td colSpan={1}>{item.description}</td>
                      <td colSpan={1}>
                        
                        <div className="row gx-2">
                          {item?.projectImage == null ? (
                                "No Image Uploaded"
                              ) : (
                                <>
                                  {item?.projectImage.map((item, index) => (
                                    <div key={index} className="col">
                                      <img
                                        key={index}
                                        className="img-fluid"
                                        src={`${domain}/uploads/${item}`}
                                        alt=""
                                        style={{ width: "150px", height: "100%" }}
                                      />
                                    </div>
                                  ))}
                                </>
                              )}
                        </div>
                      </td>
                      <td colSpan={1}>
                        <Link
                          to={`/edit-people/${item.id}`}
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

export default People;
