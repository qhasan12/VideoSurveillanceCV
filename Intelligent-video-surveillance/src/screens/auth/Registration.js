import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth, firestore } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Registration(props) {
  const [show, setShow] = useState(true);
  const [organization, setOrganization] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.href = '/';
  };

  const handleShow = () => setShow(true);

  const SignUp = async (e) => {
    e.preventDefault();

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrMessage('Invalid email format');
      setIsError(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, pwd);
      // Add user details to Firestore
      await setDoc(doc(firestore, 'users', userCredential.user.uid), {
        organization,
        name,
        contact,
        email,
      });
      console.log("User registered successfully:", userCredential);
      setShow(false);
      window.location.href = '/';

    } catch (error) {
      console.error("Error registering user:", error);
      setErrMessage(error.message);
      setIsError(true);
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header className="rounded-0 border-0 px-4 pt-3 pb-0" closeButton>
          <Modal.Title>Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-4 px-4">
          <Form onSubmit={SignUp}>
            <Row className="mb-3">
              <Form.Group controlId="formGridOrganization">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your Organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridContact">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                />
              </Form.Group>
            </Row>

            {isError && <p style={{ color: 'red' }}>{errMessage}</p>}

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Agree to terms and conditions" />
            </Form.Group>
            <Form.Group className="mb-3 text-right">
              <Button className="fs-1.25x bg-blue border-0 px-5 py-2 border-rounded-35x" variant="primary" type="submit">
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Registration;
