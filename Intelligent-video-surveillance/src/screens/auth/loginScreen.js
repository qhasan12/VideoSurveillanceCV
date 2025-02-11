import { useState , useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {auth} from '../../firebase'
import { signInWithEmailAndPassword } from 'firebase/auth';

function LoginScreen(props) {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  
  const [errmessage, setErrormsg] = useState('');
  const [success, setSuccess] = useState(false);



  useEffect(()=>{
    setErrormsg('');
  },[email, pwd])
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => setShow(true);
  const signIn =(e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, pwd)
    .then((userCredental)=>{
      console.log(userCredental)
    }).catch((error)=>{
      console.log(error)
    })
  }
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
        <Modal.Header className='rounded-0 border-0 px-4 pt-3 pb-0' closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-4 px-4">
          <Form onSubmit={signIn}>
            <p ref={errRef}></p>
            <Row className="mb-3">
              <Form.Group controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </Form.Group>

              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>
            <Form.Group onClick={handleClose} className="mb-3 text-left" id="formGridCheckbox">
              <Link to="/registration" className="text-decoration-none text-black">
              SignUp/Registration
              </Link>
            </Form.Group>
            <Form.Group   className="mb-3 text-right" id="formGridCheckbox">
            <Link to="/registration" className="text-decoration-none text-black">
              Forgot Password?
            </Link>
            </Form.Group>
            <Button className='fs-1.25x d-block mx-auto bg-blue border-0 px-5 py-2 border-rounded-35x' variant="primary" type="submit">
              Confirm
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginScreen;