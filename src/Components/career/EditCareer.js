import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditCareer = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [vacancy, setVacancy] = useState("");
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [salary, setSalary] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${domain}/career`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(data);

  const singleUser = data.find((item) => item.id == params.id);

  useEffect(() => {
    if (data.length > 0 && singleUser) {
      setId(singleUser.id || "");
      setTitle(singleUser.title || "");
      setVacancy(singleUser.vacancy || "");
      setDescription(singleUser.description || "");
      setEducation(singleUser.education || "");
      setSalary(singleUser.salary || "");
    }
  }, [data, singleUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", title);
    formData.append("vacancy", vacancy);
    formData.append("education", education);
    formData.append("salary", salary);
    if (editorRef.current) {
      formData.append("description", editorRef.current.getContent());
    }

    axios
      .post(`${domain}/updatecareer/`, formData)
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
                    defaultValue={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="vacancy">
                  <Form.Label>Vacancy</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={vacancy}
                    onChange={(e) => setVacancy(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={6}>
                <Form.Group controlId="education">
                  <Form.Label>Education</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={education}
                    onChange={(e) => setEducation(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col lg={6}>
                <Form.Group controlId="salary">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="text"
                    defaultValue={salary}
                    onChange={(e) => setSalary(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col lg={12}>
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

export default EditCareer;
