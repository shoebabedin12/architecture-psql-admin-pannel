import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const [data, setData] = useState({});
  const [deleteData, setDeleteData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${domain}/home`)
      .then((res) => {
        setData(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [deleteData]);

  //   delete user
  const handleClick = (id) => {
    axios
      .post(`${domain}/deletehome/`, { id: id })
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
  console.log(data);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2 className="text-center title">Home Page</h2>
              {data && (
                <Link to={"/home-added"} className="btn btn-primary">
                  Home data add
                </Link>
              )}
            </div>
          </div>
          <div className="col-12">
            <div className="home_info border px-2 py-3 bg-dark text-light">
              {data.length > 0 ? (
                <>
                  <div className="action_btn d-flex align-items-center justify-content-end mb-3">
                    <Link
                      to={`/home-edit/${data[0]?.id}`}
                      className="btn btn-primary me-2"
                    >
                      Edit
                    </Link>
                    <Button
                      onClick={() => handleClick(data[0]?.id)}
                      className="btn btn-danger"
                      role="button"
                      type="submit"
                    >
                      Delete
                    </Button>
                  </div>
                  <Table striped bordered hover variant="dark" responsive>
                    <tbody>
                      <tr>
                        <td>Company Logo: </td>
                        <td>
                          <span>
                            {data[0]?.image == null ? (
                              "No Image Uploaded"
                            ) : (
                              <>
                                <img
                                  className="img-fluid mx-2"
                                  src={`${domain}/uploads/${data[0]?.image}`}
                                  alt=""
                                  style={{ width: "150px", height: "40px" }}
                                />
                              </>
                            )}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>Company Name: </td>
                        <td>
                          <span>{data[0]?.companyName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td> Company address:</td>
                        <td>
                          <span>{data[0]?.address}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Company phone:</td>
                        <td>
                          <span>{data[0]?.phone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Company email:</td>
                        <td>
                          <span>{data[0]?.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Company google map:</td>
                        <td>
                          <iframe
                            src={data[0]?.googleMap}
                            width="800"
                            height="450"
                            style={{ border: "0px" }}
                            loading="lazy"
                          ></iframe>
                        </td>
                      </tr>
                      <tr>
                        <td>Slider Image:</td>
                        <td>
                          <div className="row">
                            {data[0]?.home_slider == null ? (
                              "No Image Uploaded"
                            ) : (
                              <>
                                {data[0]?.home_slider.map((item, index) => (
                                  <div key={index} className="col mb-3">
                                    <img
                                      key={index}
                                      className="img-fluid"
                                      src={`${domain}/uploads/${item}`}
                                      alt=""
                                      style={{ width: "100%", height: "250px" }}
                                    />
                                  </div>
                                ))}
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : (
                <p className="text-center">No Data Found</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
