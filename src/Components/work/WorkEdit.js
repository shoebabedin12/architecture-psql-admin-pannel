import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const WorkEdit = () => {
  const domain = process.env.REACT_APP_DOMAIN;
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState();
  const [files, setFiles] = useState({});
  const editorRef = useRef(null);

  // const log = () => {
  //   if (editorRef.current) {
  //     console.log(editorRef.current.getContent());
  //   }
  // };
  useEffect(() => {
    axios
      .get(`${domain}/work`)
      .then((res) => {
        setData(res.data.works);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const singleUser = data.find((item) => item.id == params.id);

  useEffect(() => {
    // Inside your handleSubmit function after submitting the form
    if (data.length > 0 && singleUser) {
      setId(singleUser.id || "");
      setTitle(singleUser.title || "");
      setDescription(singleUser.description || "");
    }
  }, [data, singleUser]);


  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title);

    // Get the content from the TinyMCE Editor
    if (editorRef.current) {
      formData.append("content", editorRef.current.getContent());
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    axios
      .post(`${domain}/updatework/`, formData)
      .then((res) => {
        console.log(res);
        navigate("/work");
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
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    file
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
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
                      content_style: "body",
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

export default WorkEdit;
