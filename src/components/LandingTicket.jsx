import { useState, useEffect } from 'react';
import "../styles/LandingTicket.css";
import TicketCard from './TicketCard';
import { Upload, Button, Input } from 'antd';
import uploadIcon from "../assets/icon.svg";
import ticketIcon from "../assets/Ticket.svg";
import QRCode from 'react-qr-code';
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"; 

const LandingTicket = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [profileUrl, setProfileUrl] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [ticketData, setTicketData] = useState(null); 
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [ticketQty, setTicketQty] = useState("");
  const [projectDetails, setProjectDetails] = useState("");

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleTicketQtyChange = (e) => setTicketQty(e.target.value);
  const handleUrlChange = (e) => setProfileUrl(e.target.value);

  const handleFileChange = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedTicket) {
      toast.error('Please select a ticket type!');
      return;
    }
    if (currentStep === 2 && (!profileImage && !profileUrl)) {
      toast.error('Please upload a profile image or provide a valid URL');
      return;
    }
    if (currentStep === 2 && (!name || !email)) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setCurrentStep(currentStep + 1);
};

  const handleToast = () => {
    toast.info("Ticket Downloaded!")
  }
  const handleCancel = () => {
    setCurrentStep(1);
    setSelectedTicket(null);
    setProfileUrl("");
    setProfileImage(null);
    setTicketData(null);
    setName("");
    setEmail("");
    setTicketQty(""); 
    setProjectDetails("");
    localStorage.removeItem("ticketData"); 
  };

  const handleTicketSelect = (ticketType) => {
    setSelectedTicket(ticketType);
  };

  const handleTicketData = () => {
    const data = {
      ticketType: selectedTicket,
      profileImage: profileImage,
      profileUrl: profileUrl,
      name: name,
      email: email,
      qty: ticketQty,
      projectDetails: projectDetails
    };

    console.log(data); 

    
    setTicketData(data);

   
    localStorage.setItem("ticketData", JSON.stringify(data));
    handleNext();
  };

  const generateQRCode = () => {
    const ticketDetails2 = JSON.stringify({
      ticketType: ticketData.ticketType,
      name: ticketData.name,
      email: ticketData.email,
    });
    if (ticketData) {
      return <QRCode value={ticketDetails2} id='qr-code' />;
    }
    return null;
  };

  useEffect(() => {
    const storedTicketData = localStorage.getItem("ticketData");
    if (storedTicketData) {
      const parsedData = JSON.parse(storedTicketData);
      setTicketData(parsedData);
      setName(parsedData.name);
      setEmail(parsedData.email);
      setTicketQty(parsedData.qty);
      setProfileUrl(parsedData.profileUrl);
      setProfileImage(parsedData.profileImage);
      setProjectDetails(parsedData.projectDetails);
    }
  }, []);

  useEffect(() => {
    if (ticketData) {
      localStorage.setItem("ticketData", JSON.stringify(ticketData));
    }
  }, [ticketData]);

  const progress = (currentStep - 1) * 50;

  return (
    <div className="ticket-container">
      <div className="ticket-text">
        <h2>{currentStep === 1 ? 'Ticket Selection' : 'Attendee Details'}</h2>
        <p>Step {currentStep}/3</p>
      </div>

      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="event-details">
        {currentStep === 1 && (
          <div>
            <div className="event-title">
              <div className="event-title-text">
                <h2>Techember Fest ”25</h2>
                <p>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>

                <div className="event-location">
                  <p>📍[Event Location]</p>
                  <span className="line"></span>
                  <span className="line"></span>
                  <p>March 15, 2025 | 7:00 PM</p>
                </div>
              </div>
            </div>

            <div className="hr"></div>

            <div className="ticket-type-container">
              <p>Select Ticket Type:</p>
              <div className="ticket-select">
                <TicketCard
                  ticketTitle="Regular Access"
                  Qty="20 left"
                  price="Free"
                  isSelected={selectedTicket === 'Regular Access'}
                  onClick={() => handleTicketSelect('Regular Access')}
                />
                <TicketCard
                  ticketTitle="VIP ACCESS"
                  Qty="20 left"
                  price="$50"
                  isSelected={selectedTicket === 'VIP ACCESS'}
                  onClick={() => handleTicketSelect('VIP ACCESS')}
                />
                <TicketCard
                  ticketTitle="VVIP ACCESS"
                  Qty="20 left"
                  price="$150"
                  isSelected={selectedTicket === 'VVIP ACCESS'}
                  onClick={() => handleTicketSelect('VVIP ACCESS')}
                />
              </div>
            </div>

            <div className="order-qty">
              <h2>Number of Tickets</h2>
              <label htmlFor="ticket">Select Quantity</label>
              <select name="ticket" id="ticket" onChange={(e) => handleTicketQtyChange(e)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>

              <div className="cta">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleNext}>Next</button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="photo-select-container">
              <h2>Upload Profile Photo</h2>

              <div className="photo-upload-container">
                <Upload
                  beforeUpload={(file) => {
                    handleFileChange(file);
                    return false; 
                  }}
                  showUploadList={false}
                >
                  <Button
                    icon={<img src={uploadIcon} alt="custom-upload" />}
                    style={{ marginTop: 10 }}
                    className="image-upload"
                  >
                    Drag & drop or click to upload
                  </Button>
                </Upload>

                <Input
                  type="text"
                  value={profileUrl}
                  onChange={handleUrlChange}
                  placeholder="Enter image URL"
                />
              </div>
            </div>

            <div className="attendee-details">
              <div className='attendee-bio'>
                <label>Enter your name </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(e)}
                  placeholder="Enter full name"
                />
              </div>
              <div className='attendee-bio'>
                <label>Enter your email* </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  placeholder="kayskidadenusi@gmail.com"
                />
              </div>
              <div className='bio'>
                <label>About the project </label>
                <textarea
                  value={projectDetails}
                  onChange={(e) => setProjectDetails(e.target.value)}
                  placeholder="Textarea"
                />
              </div>

              <div className="cta">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleTicketData}> Next</button>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2>Ready</h2>
            <p>Step 3/3</p>

            <div className="confirm-ticket">
              <h2>Your Ticket is Booked!</h2>
              <p>You can download or check your email for a copy</p>

              <div className="ticket-image-container">
                {ticketData && generateQRCode()}
                <img className='image-ticket' src={ticketIcon} alt="" />

                <div className="qr-text">
                  <h2>Techember Fest ”25</h2>
                  <p>📍 04 Rumens road, Ikoyi, Lagos</p>
                  <p>📅 March 15, 2025 | 7:00 PM</p>
                </div>

                <p>Ticket for only {ticketQty} entry</p>
              </div>
            </div>

            <div className="cta">
              <button onClick={handleCancel}>Book Another Ticket</button>
              <button onClick={handleToast}>Download Ticket</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingTicket;
