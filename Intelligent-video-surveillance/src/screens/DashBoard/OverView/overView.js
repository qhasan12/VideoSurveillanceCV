import React, { useState, useEffect } from 'react';
import { Col, Row } from "react-bootstrap";
import SideBar from "../sideBar";
import dashboardLogo from '../../../assets/img/dashboard-logo.png';
import AnomalyChart from '../anomalyChart';
import './overView.css';
import Alert from '../alerts';
import CustomAlert from '../customalert'; 


function OverView() {
  const [showAlert, setShowAlert] = useState(false);



  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <Row className="border-bottom">
        <Col md={2} className="pe-0">
          <div className="dashboard-logo border-end py-2">
            <img className="mw-100" src={dashboardLogo} alt="Logo" />
          </div>
        </Col>
        <Col className="ps-0 d-grid align-items-center">
          <div className="page-header py-2 ps-4">
            <h2 className="page-heading">OverView</h2>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={2} className="pe-0 border-end">
          <SideBar />
        </Col>
        <Col md={10} className="ps-0">
          <Row className="pt-4 px-4">
            <Col md={5}>
              <Alert /> {/* Render the Alert component */}
            </Col>
            <Col md={7}>
              <img className="w-100 mw-100" src="http://127.0.0.1:5000/webapp" alt="Detection Overview" />
            </Col>
            <Col>
                  <AnomalyChart/>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default OverView;
