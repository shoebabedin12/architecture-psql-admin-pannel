import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddPeople = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [file, setFile] = useState([]);
  const [files, setFiles] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("designation", designation);
    // Get the content from the TinyMCE Editor
    if (editorRef.current) {
      formData.append("description", editorRef.current.getContent());
    }

    // Append the file and files directly without converting to strings
    formData.append("file", file);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    axios
      .post(`${domain}/createpeople`, formData)
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
            <Form className="row" onSubmit={handleSubmit}>
              <Col lg="6">
                <Form.Group controlId="Name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="image">
                  <Form.Label>Profile</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="Designation">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg="6">
                <Form.Group controlId="image">
                  <Form.Label>Project Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                  />
                </Form.Group>
              </Col>
              <Form.Group controlId="Description">
                <Form.Label>Description</Form.Label>
                <Editor
                  onInit={(evt, editor) => (editorRef.current = editor)}
                  // initialValue="<p>This is the initial content of the editor.</p>"
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

export default AddPeople;
