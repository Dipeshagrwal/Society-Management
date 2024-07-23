
import React, { useState,useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/";
function AddAdmin() {
  const [flats, setFlats] = useState([]);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState('');
  const [errorImage, setErrorImage] = useState('');
  
  const validateForm = () => {
    let isValid = true;
    if (userData.FirstName.trim() === '') {
      setErrorFirstName('First Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(userData.FirstName)) {
      setErrorFirstName('First Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorFirstName('');
    }
    // Validate Middle Name
    if (!/^[a-zA-Z\s]*$/.test(userData.MiddleName)) {
      setErrorMiddleName('Middle Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorMiddleName('');
    }

    // Validate Last Name
    if (userData.LastName.trim() === '') {
      setErrorLastName('Last Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(userData.LastName)) {
      setErrorLastName('Last Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorLastName('');
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(userData.MobileNumber)) {
      setErrorMobileNumber('Mobile Number should be a 10-digit number');
      isValid = false;
    } else {
      setErrorMobileNumber('');
    }

    // Validate Image
    if (userData.Image) {
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const fileExtension = userData.Image.name.slice(((userData.Image.name.lastIndexOf(".") - 1) >>> 0) + 2);
      if (!allowedExtensions.includes(`.${fileExtension}`.toLowerCase())) {
        setErrorImage('Invalid file format. Only .jpg, .jpeg, and .png are allowed.');
        isValid = false;
      } else {
        setErrorImage('');
      }
    }

    return isValid;
  };


  const [userData, setuserData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    Email:'',
    MobileNumber: '',
    StartingDate:'',
    EndingDate:'',
    Image1:null,
});
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
      if (!isValid) {
        // Display an error message or take appropriate action
        return;
      }
      console.log(userData);
      const response = await axios.post('/addAdminData', {
        FirstName:userData.FirstName ,
        MiddleName:userData.MiddleName,
        LastName:userData.LastName ,
        Email:userData.Email,
        MobileNumber:userData.MobileNumber ,
        StartingDate:userData.StartingDate ,
        EndingDate:userData.EndingDate ,
        Image:userData.Image1,
       }, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },
      });
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
            <span className="dashboard">Manage User</span>
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
              <div className="title">Add Admin Details</div>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">First Name : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter First Name"
                      value={userData.FirstName}
                      onChange={(e) => setuserData({ ...userData, FirstName: e.target.value })}
                      
                    />
                    <p id="errorFirstName" style={{ color: 'red' }}>{errorFirstName}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">Middle Name : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Middle Name"
                      value={userData.MiddleName}
                      onChange={(e) => setuserData({ ...userData, MiddleName: e.target.value })}
                      
                    />
                    <p id="errorMiddleName" style={{ color: 'red' }}>{errorMiddleName}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">Last Name : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Last Name"
                      value={userData.LastName}
                      onChange={(e) => setuserData({ ...userData, LastName: e.target.value })}
                      
                    />
                    <p id="errorLastName" style={{ color: "red" }}>{errorLastName}</p>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail4"
                      placeholder="Email"
                      value={userData.Email}
                      onChange={(e) => setuserData({ ...userData, Email: e.target.value })}
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
                     <p id="errorMobileNumber" style={{ color: "red" }}>{errorMobileNumber}</p>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-md-4 mb-3">
                    <label htmlFor="allotmentDate">Upload Image:</label>
                          <input
                          type="file"
                          className="form-control"
                          id="Image1"
                          name="Image1"
                          accept="image/*" // Specify the file types accepted
                          multiple
                          onChange={(e) => setuserData({
                            ...userData,Image1: e.target.files[0]})}
                        />
                        <p id="errorImage" style={{ color: "red" }}>{errorImage}</p>
                  </div>
                  
                  <div className="col-md-4 mb-3">
                    <label htmlFor="allotmentDate">Starting Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="allotmentDate"
                      name="allotmentDate"
                      value={userData.StartingDate}
                      onChange={(e) => setuserData({ ...userData, StartingDate: e.target.value })}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="allotmentDate">Ending Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="allotmentDate"
                      name="allotmentDate"
                      value={userData.EndingDate}
                      onChange={(e) => setuserData({ ...userData, EndingDate: e.target.value })}
                    />
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
export default AddAdmin;
