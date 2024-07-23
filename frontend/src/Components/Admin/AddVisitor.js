
import React, { useState,useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/";
function AddVisitor() {
  const [users, setusers] = useState([]);
  const [Flats, setFlats] = useState([]);


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
    // Fetch flats data from the backend API
    axios.get('/AvailableFlat')
      .then(response => {
        setFlats(response.data);  
      })
      .catch(error => {
        console.error('Error fetching flats:', error);
      });
  }, []);
  const [userData, setuserData] = useState({
    VisitorName: '',
    MobileNumber: '',
    Adress: '',
    WhomToMeet:'650aaa3cca8417446459d0c4',
    Proof: '',
    FlatId:'64e593e4643a0d7828988b9e',

});
  
  const handleSubmit = async (event) => {
    event.preventDefault();
try{
      const response = await axios.post('/addVisitorData', {
        VisitorName:userData.VisitorName,
        MobileNumber:userData.MobileNumber,
        Adress:userData.Adress,
        WhomToMeet:userData.WhomToMeet,
        Proof:userData.Proof,
        FlatId:userData.FlatId,
       });
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
  };

  const handleUserIdChange = (e) => {
    const selectedUserId = e.target.value;
    setuserData({ ...userData, WhomToMeet: selectedUserId });
  };
  const handleFlatIdChange = (e) => {
    const selectedFlatId = e.target.value;
    setuserData({ ...userData, FlatId: selectedFlatId });
  };
  //geting first flatid as default
  
   // Access the first ID if the array is not empty


  return (
    <>
      <AdminSidebar></AdminSidebar>
      <section className="home-section" >
        <nav>
          <div className="sidebar-button">
            <i
              className="bx bx-menu sidebarBtn"
              // onClick={handleSidebarToggle}
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
              <div className="title">Add Visitor Details</div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <div className="col-md-12 mb-6">
                    <label htmlFor="FlatNumber">Visitor Name : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter visitor Name"
                      value={userData.VisitorName}
                      onChange={(e) => setuserData({ ...userData, VisitorName: e.target.value })}
                      
                    />
                    {/* <p id="errorFirstName" style={{ color: 'red' }}>{errorFirstName}</p> */}
                  </div>
                 
                </div>
                <div className="form-group">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Address"
                      value={userData.Adress}
                      onChange={(e) => setuserData({ ...userData, Adress: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={userData.MobileNumber}
                      onChange={(e) => setuserData({ ...userData, MobileNumber: e.target.value })}
                    />
                     {/* <p id="errorMobileNumber" style={{ color: "red" }}>{errorMobileNumber}</p> */}
                  </div>
                </div>

                <div className="form-group">
                  
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="flatID">Flat Id</label>
                    <select
                          className="form-control"
                          id="flatID"
                          name="flatID"
                          value={userData.FlatId}
                          onChange={handleFlatIdChange}
                        >
                          {Flats.map(flat => (
                            <option key={flat._id} value={flat._id}>
                              {flat.flatId}
                            </option>
                          ))}
                        </select>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="flatID">WhomToMeet</label>
                    <select
                          className="form-control"
                          id="flatID"
                          name="flatID"
                          value={userData.WhomToMeet}
                          onChange={handleUserIdChange}
                        >
                          {users.map(user => (
                            <option key={user._id} value={user._id}>
                              {user.FirstName} {user.MiddleName} {user.LastName}
                            </option>
                          ))}
                        </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">Proof : <sub style={{color:"red"}}>Enter any id or car number</sub></label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Proof Id number"
                      value={userData.Proof}
                      onChange={(e) => setuserData({ ...userData, Proof: e.target.value })}
                      
                    />
                    {/* <p id="errorLastName" style={{ color: "red" }}>{errorLastName}</p> */}
                  </div>
                </div>
                
                <div>
                 
                  
                </div>
                <button type="submit" className="btn btn-primary">
                  Add User
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
export default AddVisitor;
