import React, { useState, useEffect } from 'react';
import SideBar from "../sideBar";
import dashboardLogo from '../../../assets/img/dashboard-logo.png';
import { Col, Row } from "react-bootstrap";
import './LiveFootage.css'; // Import a CSS file for styling

function LiveFootage() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch the list of video files with metadata from the server
        fetch('/api/videos')
            .then(response => response.json())
            .then(data => setVideos(data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

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
                        <h2 className="page-heading">Recordings</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={2} className="pe-0 border-end">
                    <SideBar />
                </Col>
                <Col>
                    <div className="records border border-rounded-20x px-4 pt-4 pb-3 mt-4">
                        <h4 className="section-heading">Recordings</h4>
                        {/* Video List */}
                        <div className="video-list mt-4">
                            {videos.map((video) => (
                                <div key={video.id} className="video-item d-flex justify-content-between align-items-center py-2">
                                    <Row className="video-info w-100">
                                      <Col md={2}>
                                        <p className='fw-bold mb-2'>ID</p>
                                      <span className="video-id">{video.id}</span>
                                        </Col>
                                        <Col md={5}>
                                        <p className='fw-bold mb-2'>Name</p>
                                        <span className="video-name">{video.name}</span>
                                        </Col>
                                        <Col md={5}>
                                        <p className='fw-bold mb-2'>Date</p>
                                        <span className="video-date">{video.date}</span>
                                        </Col>
                                    </Row>
                                    <a
                                        href={`http://localhost:5000/videos/${video.name}`}
                                        download
                                        className="btn btn-primary"
                                    >
                                        Download
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default LiveFootage;
