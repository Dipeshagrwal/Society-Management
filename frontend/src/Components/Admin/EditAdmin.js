
import React, { useState,useEffect } from "react";
import { useParams } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/";
function EditAdmin({}) {
  const { id } = useParams();
  const [user, setuserData] = useState({
    FirstName: '',
    MiddleName: '',
    LastName: '',
    EmailId:'',
    MobileNumber: '',
    StartingDate:'',
    EndingDate:'',
    Image:null,
});

  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState('');
  const [errorImage, setErrorImage] = useState('');
  useEffect(() => {
    async function fetchFlatData() {
      try {
        const response = await axios.get(`/getUserData/${id}`);
        const fetchedData=response.data;
        setuserData({
          Image:fetchedData.Image,
          FirstName: fetchedData.FirstName,
          MiddleName: fetchedData.MiddleName,
          LastName: fetchedData.LastName,
          MobileNumber: fetchedData.MobileNumber,
          EmailId:fetchedData.EmailId,
          UserType:fetchedData.UserType,
          StartingDate:fetchedData.StartingDate,
          EndingDate:fetchedData.EndingDate,
        });
      } catch (error) {
        console.error('Error fetching flats:', error);
      }
    }
    fetchFlatData();
  }, [id]);
  function formatDateForInput(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  const validateForm = () => {
    let isValid = true;
    if (user.FirstName.trim() === '') {
      setErrorFirstName('First Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(user.FirstName)) {
      setErrorFirstName('First Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorFirstName('');
    }
    // Validate Middle Name
    if (!/^[a-zA-Z\s]*$/.test(user.MiddleName)) {
      setErrorMiddleName('Middle Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorMiddleName('');
    }

    // Validate Last Name
    if (user.LastName.trim() === '') {
      setErrorLastName('Last Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(user.LastName)) {
      setErrorLastName('Last Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorLastName('');
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(user.MobileNumber)) {
      setErrorMobileNumber('Mobile Number should be a 10-digit number');
      isValid = false;
    } else {
      setErrorMobileNumber('');
    }

    // Validate Image
    

    return isValid;
  };


  
const handleSubmit = async (event) => {
  console.log(user);
  event.preventDefault();
  const isValid = validateForm();

  if (!isValid) {
    // Display an error message or take appropriate action
    return;
  }
  try {
    
     const response = await axios.post(`/editUserData/${id}`, {
         Image:user.Image,
          FirstName: user.FirstName,
          MiddleName: user.MiddleName,
          LastName: user.LastName,
          MobileNumber: user.MobileNumber,
          EmailId:user.EmailId,
          StartingDate:user.StartingDate,
          EndingDate:user.EndingDate,
     }, {
      headers: {
        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
      },});
     
    Swal.fire({
      title: 'Success',
      text: response.data.message,
      icon: 'success',
      allowOutsideClick: false, // Prevent closing on outside click
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the home page after clicking "OK"
        window.location.href = '/User'; // Replace '/' with the actual home page route
      }
    });
  } catch (error) {
    // Handle error
    console.error('Error adding flat:', error);
    Swal.fire('Error', 'An error occurred while adding flat data', 'error');
  }
};
  const handleFlatIdChange = (e) => {
    const selectedFlatId = e.target.value;
    setuserData({ ...user, FlatId: selectedFlatId });
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
            <span className="dashboard">Manage Admin</span>
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
            style={{ width: "1900px", height: "660px",position:"fixed"}}
          >
            <div className="recent-sales box"  >
              <div className="title">Edit Admin Details</div>
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
                      value={user.FirstName}
                      onChange={(e) => setuserData({ ...user, FirstName: e.target.value })}
                      
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
                      value={user.MiddleName}
                      onChange={(e) => setuserData({ ...user, MiddleName: e.target.value })}
                      
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
                      value={user.LastName}
                      onChange={(e) => setuserData({ ...user, LastName: e.target.value })}
                      
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
                      value={user.EmailId}
                      onChange={(e) => setuserData({ ...user, EmailId: e.target.value })}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputPassword4">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={user.MobileNumber}
                      onChange={(e) => setuserData({ ...user, MobileNumber: e.target.value })}
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
                              ...user,Image: e.target.files[0]})}
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
                      value={formatDateForInput(user.StartingDate)}
                      onChange={(e) => setuserData({ ...user, StartingDate: e.target.value })}
                     
                     
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="allotmentDate">Ending Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="allotmentDate"
                      name="allotmentDate"
                      value={formatDateForInput(user.EndingDate)}
                      onChange={(e) => setuserData({ ...user, EndingDate: e.target.value })}
                     
                    />
                  </div>
                  <div className="col-md-3 mb-3">  <br></br>
                  <img src={user.Image} alt="No Image Available" style={{borderRadius:"5%",width:"150px",height:"150px",overflow:"hidden",justifyContent:"center"}}  />
                  </div>
                </div>
              
                <div>
                 
                  
                </div>
                <button type="submit" className="btn btn-primary">
                  Edit User
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
export default EditAdmin;
