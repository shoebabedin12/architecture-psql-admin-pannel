import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    const updateData = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    axios
      .post(`${domain}/login`, updateData)
      .then((res) => {
        console.log(res);
        if (res.data.Login === true) {
          toast(res.data.message);
          localStorage.setItem("user", JSON.stringify(res.data.data))
          navigate('/')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="form">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <Form onSubmit={handleSubmit}>
              <h1 className="text-center">Login Form</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Link to={"/signup"}>I don't have an account</Link>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
