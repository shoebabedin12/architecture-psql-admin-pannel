import axios from "axios";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const updateData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password")
    };

    axios
      .post(`${domain}/signup`, updateData)
      .then((res) => {
        if (res.status === 200) {
          toast(res.data.message);
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log(err);
        toast(err.error);
        toast(err.response.data.error);
      });
  };
  return (
    <div className="form">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <Form onSubmit={handleSubmit}>
              <h1 className="text-center">Signup Form</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
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
                <Link to={"/login"}>Already have an account</Link>
              </Form.Group>
              <Button variant="primary" type="submit">
                Signup
              </Button>
            </Form>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Signup;
