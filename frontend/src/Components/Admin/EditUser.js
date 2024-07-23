
import React, { useState,useEffect} from "react";
import { useParams } from 'react-router-dom';
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import '../css/Admin.css';
import '../css/Login.css';
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:4000/";

function EditUser({}) {
  const { id } = useParams();
  const [users, setusersData] = useState([]);
  const [flats, setFlats] = useState([]);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState('');
  const [errorImage, setErrorImage] = useState('');
  const validateForm = () => {
    let isValid = true;
    if (users.FirstName.trim() === '') {
      setErrorFirstName('First Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(users.FirstName)) {
      setErrorFirstName('First Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorFirstName('');
    }
    // Validate Middle Name
    if (!/^[a-zA-Z\s]*$/.test(users.MiddleName)) {
      setErrorMiddleName('Middle Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorMiddleName('');
    }

    // Validate Last Name
    if (users.LastName.trim() === '') {
      setErrorLastName('Last Name is required');
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(users.LastName)) {
      setErrorLastName('Last Name should only contain letters and spaces');
      isValid = false;
    } else {
      setErrorLastName('');
    }

    // Validate Mobile Number
    if (!/^\d{10}$/.test(users.MobileNumber)) {
      setErrorMobileNumber('Mobile Number should be a 10-digit number');
      isValid = false;
    } else {
      setErrorMobileNumber('');
    }

    // Validate Image
    

    return isValid;
  };
  useEffect(() => {
    async function fetchUserData() {
      try {
            axios.get('/Flat')
            .then(response => {
              setFlats(response.data);  
            })
            .catch(error => {
              console.error('Error fetching flats:', error);
            });

        const response = await axios.get(`/getUserData/${id}`);
        const fetchedData=response.data; 
        const isAdmin = fetchedData.AccessType === 'admin'|| fetchedData.AccessType === 'security';
        setusersData({
          FlatId:fetchedData.FlatId,
          FirstName:fetchedData.FirstName,
          MiddleName:fetchedData.MiddleName,
          LastName:fetchedData.LastName,
          MobileNumber:fetchedData.MobileNumber,
          Email:fetchedData.Email,
          AllotmentDate:fetchedData.AllotmentDate,
          Image:fetchedData.Image,
          isAdmin: isAdmin, 
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUserData();
  }, [id]);
 
   
  function formatDateForInput(rawDate) {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (!isValid) {
      // Display an error message or take appropriate action
      return;
    }
    try {
      
       const response = await axios.post(`/editUserData/${id}`, {
        FirstName:users.FirstName ,
        MiddleName:users.MiddleName,
        LastName:users.LastName ,
        Email:users.Email,
        MobileNumber:users.MobileNumber ,
        FlatId:users.FlatId,
        AllotmentDate:users.AllotmentDate,
        Image:users.Image,
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
    setusersData({ ...users, FlatId: e.target.value });
  };

  return (
    <>
      <AdminSidebar></AdminSidebar>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className="bx bx-menu sidebarBtn"></i>
            <span className="dashboard">Manage User</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="bx bx-search" style={{ marginTop: "8px" }}></i>
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
            style={{ width: "1900px", height: "630px"}}
          >
            <div className="recent-sales box" >
              <div className="title">Edit User Details</div>
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
                      value={users.FirstName}
                      onChange={(e) => setusersData({ ...users, FirstName: e.target.value })}
                      
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
                      value={users.MiddleName}
                      onChange={(e) => setusersData({ ...users, MiddleName: e.target.value })}
                      
                    />
                    
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">Last Name : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Last Name"
                      value={users.LastName}
                      onChange={(e) => setusersData({ ...users, LastName: e.target.value })}
                      
                    />
                    <p id="errorLastName" style={{ color: "red" }}>{errorLastName}</p>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-4 mb-3">
                      <label htmlFor="inputEmail4">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        placeholder="Email"
                        value={users.Email}
                        onChange={(e) => setusersData({ ...users, Email: e.target.value })}
                      />
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="inputPassword4">Mobile Number</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputPassword4"
                      placeholder="Password"
                      value={users.MobileNumber}
                      onChange={(e) => setusersData({ ...users, MobileNumber: e.target.value })}
                    />
                    <p id="errorMobileNumber" style={{ color: "red" }}>{errorMobileNumber}</p>

                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="flatID">Flat ID:</label>
                    <select
                          className="form-control"
                          id="flatID"
                          name="flatID"
                          value={users.FlatId}
                          onChange={handleFlatIdChange}
                          disabled={users.isAdmin}
                        >
                          <option value="Select a value">select Flat</option>
                          {flats.map(flat => (
                            <option key={flat._id} value={flat._id}>
                              {flat.flatId}
                            </option>
                          ))}
                        </select>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="allotmentDate">Allotment Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="allotmentDate"
                      name="allotmentDate"
                      value={formatDateForInput(users.AllotmentDate)}
                      onChange={(e) => setusersData({ ...users, AllotmentDate: e.target.value })}
                      disabled={users.isAdmin}
                    />
                  </div>
                  <div className="col-md-3 mb-3">
                    <label htmlFor="allotmentDate">Upload Image:</label>
                          <input
                            type="file"
                            className="form-control"
                            id="allotmentDate"
                            name="image"
                            accept="image/*" // Specify the file types accepted
                            onChange={(e) => setusersData({ ...users, Image: e.target.files[0] })}
                          />
                         
                          <p id="errorImage" style={{ color: "red" }}>{errorImage}</p>
                  </div>
                  <div className="col-md-3 mb-3">  
                  <img src={users.Image} alt="No Image Available" style={{borderRadius:"5%",width:"150px",height:"150px",overflow:"hidden",justifyContent:"center"}}  />
                  </div>
                </div>               
               
                <button type="submit" className="btn btn-primary">
                  Edit User
                </button>
              </form>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default EditUser;
