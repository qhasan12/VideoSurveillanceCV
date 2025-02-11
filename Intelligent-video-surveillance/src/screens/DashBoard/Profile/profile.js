import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Col, Row, Button, Form } from "react-bootstrap";
import SideBar from "../sideBar";
import dashboardLogo from '../../../assets/img/dashboard-logo.png'
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

function Profile() {
  const [authUser, setAuthUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');
  const [newTitle, setNewTitle] = useState('Mr');
  const [newContact, setNewContact] = useState('');
  const [email, setEmail] = useState('');

  const usersignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out successful');
      })
      .catch(error => {
        console.error('Error signing out:', error);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        setAuthUser(user);
        try {
          const userDocRef = doc(firestore, `users/${user.uid}`);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setEmail(user.email); // Set email
            setUserName(userData.name);
            setNewFirstName(userData.firstName);
            setNewLastName(userData.lastName);
            setNewTitle(userData.title);
            setNewContact(userData.contact);
          } else {
            console.log('User document not found');
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
        }
      } else {
        setAuthUser(null);
        setEmail('');
        setUserName('');
        setNewFirstName('');
        setNewLastName('');
        setNewTitle('Mr');
        setNewContact('');
      }
    };
  
    const unsubscribe = onAuthStateChanged(auth, fetchData);
  
    return () => unsubscribe();
  }, []);



  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(firestore, `users/${authUser.uid}`);
      await updateDoc(userDocRef, {
        firstName: newFirstName,
        lastName: newLastName,
        title: newTitle,
        contact: newContact
      });
      console.log('User information updated successfully');
      setUserName(`${newFirstName} ${newLastName}`);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  return (
    <>
     <Row className="border-bottom ">
      <Col md={2} className="pe-0">
        <div className="dashboard-logo border-end py-2">
          <img className="mw-100" src={dashboardLogo} alt="Logo"/>
        </div>      
      </Col>
      <Col className="ps-0 d-grid align-items-center">
      <div className="page-header py-2 ps-4">
          <h2 className="page-heading">Profile</h2>
        </div>
      </Col>
    </Row>
    <Row>
      <Col md={2} className="pe-0 border-end">
        <SideBar/>
      </Col>
      <Col className="ps-0">
      {authUser ? 
        <Row className="pt-4 px-4">
          <Col md={8}>
            <button class="btn bg-blue rounded text-white py-2 px-3 mb-4">
              <span>Personal Information</span>
            </button>
            <Form onSubmit={handleSubmit}>
            <div className="border border-rounded-20x px-4 py-4 mb-4">
            <h4 className="section-heading">User</h4>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="newFirstName">
                <Form.Label className="fw-bold">First Name</Form.Label>
                <Form.Control className="fw-medium" type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
              </Form.Group>

              <Form.Group as={Col} controlId="newLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control className="fw-medium" type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
              </Form.Group>
              </Row>

              <Form.Group className="w-50" controlId="newTitle">
                <Form.Label>Title</Form.Label>
                <Form.Select className="fw-medium" value={newTitle} onChange={(e) => setNewTitle(e.target.value)}>
                  <option value="Mr">Mr</option>
                  <option value="Miss">Miss</option>
                </Form.Select>
              </Form.Group>

            </div>
            <div className="border border-rounded-20x px-4 py-4">
            <h4 className="section-heading">Contact Info</h4>
              <Row className="mb-3">
              <Form.Group as={Col} controlId="newContact">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" className="fw-medium" value={newContact} onChange={(e) => setNewContact(e.target.value)} />
              </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="fw-bold">Email</Form.Label>
                  <Form.Control value={email} className="fw-medium" type="email" placeholder="" />
                </Form.Group>
              </Row>
            </div>
          <Button className="border-0 mt-4 bg-blue rounded text-white py-2 px-3 mb-4" variant="primary" type="submit">
          Save Changes
          </Button>
            </Form>

          </Col>
          <div className='sidebar-footer d-grid align-items-end'>
        <ul className='list-unstyled'>
          <li className='mb-3'>
              <FontAwesomeIcon icon={faSignOut} />
            <Button className="bg-transparent border-0 text-black" onClick={usersignOut}>
             Logout
            </Button>
          </li>
        </ul>
      </div>
        </Row>
       : 
       <><p>Please Sign in</p></>
     }
      </Col>
    </Row>
    </>
  );
}

export default Profile;
