import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CreateCareer = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [education, setEducation] = useState("");
  const [salary, setSalary] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("vacancy", vacancy);
    // Get the content from the TinyMCE Editor
    if (editorRef.current) {
      formData.append("description", editorRef.current.getContent());
    }
    formData.append("education", education);
    formData.append("salary", salary);
  

    axios
      .post(`${domain}/createcareer`, formData)
      .then((res) => {
        console.log(res);
        navigate("/career");
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
              <Col lg={6}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="vacancy">
                  <Form.Label>Vacancy</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setVacancy(e.target.value)}
                  />
                </Form.Group>
              </Col>
             
              <Col lg={6}>
                <Form.Group controlId="education">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group controlId="salary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
                <Form.Group controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
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
              <Col lg={12}>
                <Button type="submit" className="mt-2 w-100">
                  Create new
                </Button>
              </Col>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateCareer;
