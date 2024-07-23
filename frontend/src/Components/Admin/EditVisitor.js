
import React, { useState,useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from 'axios';
import { useParams } from 'react-router-dom';

axios.defaults.baseURL = "http://localhost:4000/";
function EditVisitor({}) {
  const { id } = useParams();

  const [users, setusers] = useState([]);
  const [userData, setuserData] = useState({
    VisitorId:'',
    VisitorName: '',
    MobileNumber: '',
    Adress: '',
    WhomToMeet:'',
    ReasonToMeet: '',
    Proof:'',
    Remark:'',
});
useEffect(() => {
  // Fetch flats data from the backend API
  axios.get('/User')
    .then(response => {
      setusers(response.data);  
    })
    .catch(error => {
      console.error('Error fetching flats:', error);
    });
}, []);
useEffect(() => {
   
  async function fetchVisitorData() {
    try {
      const response = await axios.get(`/getVisitorData/${id}`);
      const fetchedData=response.data; 
      setuserData({
        VisitorId:fetchedData.VisitorId,
        VisitorName:fetchedData.VisitorName,
        MobileNumber:fetchedData.MobileNumber,
        Adress:fetchedData.Adress,
        WhomToMeet:fetchedData.WhomToMeet,
        ReasonToMeet:fetchedData.ReasonToMeet,
        Proof:fetchedData.Proof,
        Remark:fetchedData.Remark,
      });
    } catch (error) {
      console.error('Error fetching flats:', error);
    }
  }
  fetchVisitorData();
}, [id]);

const handleSubmit = async (event) => {
  event.preventDefault();
       try {
      const response = await axios.post(`/editVisitorData/${id}`, {
        Remark:userData.Remark,
        });
        setuserData({VisitorName: '',MobileNumber: '',Adress: '',WhomToMeet: '',ReasonToMeet: '',Remark:''});
      // Show success message to the user
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false, // Prevent closing on outside click
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the home page after clicking "OK"
          window.location.href = '/Visitor'; // Replace '/' with the actual home page route
        }
      });
    } catch (error) {
      // Handle error
      console.error('Error adding flat:', error);
      Swal.fire('Error', 'An error occurred while adding flat data', 'error');
    }
  }

  const handleSidebarToggle = () => {
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtn = document.querySelector(".sidebarBtn");

    sidebar.classList.toggle("active");
    if (sidebar.classList.contains("active")) {
      sidebarBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      sidebarBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };

  return (
    <>
      <AdminSidebar></AdminSidebar>
      <section className="home-section" >
        <nav>
          <div className="sidebar-button">
            <i
              className="bx bx-menu sidebarBtn"
               onClick={handleSidebarToggle}
            ></i>
            <span className="dashboard">Manage Visitor</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search" ></i>
          </div>
          <div className="profile-details">
            <img src="images/profile.jpg" alt="" />
            <span className="admin_name">Utsav vasani</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>

        <div className="home-content" style={{position:"fixed"}}>
          <div
            className="sales-boxes"
            style={{ width: "1900px", height: "630px",position:"fixed"}}
          >
            <div className="recent-sales box"  >
              <div className="title">Visitor Details</div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="card" style={{width: "68rem"}}>
              <div class="card-body">
                <h5 className="card-title" style={{fontStyle:"bold"}}>Visitor Id : {userData.VisitorId}</h5>
                <h5 className="card-title" style={{fontStyle:"bold"}}>Visitor Name : {userData.VisitorName}</h5>
                <h5 className="card-title" style={{fontStyle:"bold"}}>Visitor Address: {userData.Adress}</h5>
                <h5 className="card-title" style={{fontStyle:"bold"}}>Visitor Mobile number: {userData.MobileNumber}</h5>
                <h5 className="card-title" style={{fontStyle:"bold"}}>Visitor Proof: {userData.Proof}</h5>

                
              </div>
            </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">Outing Remark : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="ReasonToMeet"
                      value={userData.Remark}
                      onChange={(e) => setuserData({ ...userData, Remark: e.target.value })}
                      
                    />
                    
                </div>
                
                <div>
                 
                  
                </div>
                <button type="submit" className="btn btn-primary">
                  Out Visitor
                </button>
              </form>

              <div className="sales-details"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default EditVisitor;
