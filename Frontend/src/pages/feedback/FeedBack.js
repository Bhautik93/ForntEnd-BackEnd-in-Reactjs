import React, { useState } from "react";
import Button from "../../../node_modules/react-bootstrap/Button";
import Form from "../../../node_modules/react-bootstrap/Form";
import Modal from "../../../node_modules/react-bootstrap/Modal";
import axios from "axios";
import { FdValidation } from "./FdValidation";
import { toast } from "react-hot-toast";

const FeedBack = () => {
  const [data, setData] = useState({
    name : "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({}) 

  const { name, email, message } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = FdValidation(data);
    if (Object.keys(errors).length === 0) {
      await axios.post(
        "http://localhost:8900/post/feedback",
        data
      );
      toast.success("Message Sent Successfully!")
      setData("");
      setShow(false)
      }
      else {
        setErrors(errors);
        toast.error("Please fill out message");
      }
  };

  return (
    <>
      <div onClick={handleShow}>Feedback</div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>FeedBack</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Your Name"
                name="name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
              {errors.name && (
                <p style={{ color: "red" }}>{errors.name}</p>
              )}
            </Form.Group>  
            <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                name="email"
                value={email}
                onChange={handleChange}
              />
              {errors.email && (
                <p style={{ color: "red" }}>{errors.email}</p>
              )}
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                type="textarea"
                name="message"
                value={message}
                onChange={handleChange}
                placeholder="Enter Your Message..."
              />
              {errors.message && (
                <p style={{ color: "red" }}>{errors.message}</p>
              )}
            </Form.Group>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Close
              </Button>
              <Button variant="info" onClick={handleSubmit}>
                Send Message
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default FeedBack;
