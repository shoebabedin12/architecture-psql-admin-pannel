import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditPeople = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const editorRef = useRef(null);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState({});

  useEffect(() => {
    axios
      .get(`${domain}/people`)
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
      setName(singleUser.name || "");
      setDesignation(singleUser.designation || "");
      setDescription(singleUser.description || "");
      setFile(singleUser.profileImage || "");
      setFiles(singleUser.projectImage || "");
    }
  }, [data, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("file", file);
    if (editorRef.current) {
      formData.append("description", editorRef.current.getContent());
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    // return

    axios
      .post(`${domain}/updatepeople/`, formData)
      .then((res) => {
        console.log(res);
        navigate("/people");
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
              <Row>
                <Col lg="6">
                  <Form.Group controlId="Name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group controlId="Designation">
                    <Form.Label>Designation</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col lg="6">
                  <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Col>
                <Col lg="6">
                  <Form.Group>
                    <Form.Label>Project Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setFiles(e.target.files)}
                      multiple
                    />
                  </Form.Group>
                </Col>
                <Col lg="12">
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Editor
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      initialValue={description}
                      init={{
                        selector: "textarea",
                        height: 500,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount"
                        ],
                        toolbar:
                          "undo redo | " +
                          "styles | bold italic underline forecolor superscript subscript | blockquote | alignleft aligncenter | quicklink  " +
                          "alignright alignjustify | bullist numlist outdent indent | table " +
                          "removeformat |  link image | formatting quickimage quicktable flipv fliph | editimage imageoptions | hr pagebreak | help ",
                        table_toolbar:
                          "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        toolbar_mode: "wrap" | "scrolling",
                        toolbar_sticky: true,
                        toolbar_sticky_offset: 100
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col lg="12">
                  <Button type="submit" className="mt-2">
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default EditPeople;
