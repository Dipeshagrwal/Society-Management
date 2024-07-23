
import React, { useState,useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/";
function AddMember() {
  const [flats, setFlats] = useState([]);
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMobileNumber, setErrorMobileNumber] = useState('');
  const [errorImage, setErrorImage] = useState('');
  useEffect(() => {
    // Fetch flats data from the backend API
    axios.get('/getAllocatedFlatOwner')
      .then(response => {
        setFlats(response.data);  
      })
      .catch(error => {
        console.error('Error fetching flats:', error);
      });
  }, []);
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
    AllotmentDate: '',
    Salary:'',
    RelationOfMember:'',
    FlatId:'64e593e4643a0d7828988b9e',
    Image:null,
});
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

      if (!isValid) {
        // Display an error message or take appropriate action
        return;
      }
      const response = await axios.post('/addMemberData', {
        FirstName:userData.FirstName ,
        MiddleName:userData.MiddleName,
        LastName:userData.LastName ,
        Email:userData.Email,
        MobileNumber:userData.MobileNumber ,
        Proof:userData.Proof,
        Image:userData.Image,
        FlatId:userData.FlatId,
        RelationOfMember:userData.RelationOfMember,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
        },});
  };
  const handleImage1Change = (e) => {
    const selectedImage = e.target.files[0];
    setuserData({ ...userData, Image : selectedImage });
  };

const handleImage2Change = (e) => {
  const selectedImage = e.target.files[0];
  setuserData({ ...userData, Proof : selectedImage });
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
            <span className="dashboard">Manage Family Member</span>
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
              <div className="title">Add Member Details</div>
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
                          id="image"
                          name="image"
                          accept="image/*" // Specify the file types accepted
                          
                          onChange={(e) => handleImage1Change(e)}
                        />
                        <p id="errorImage" style={{ color: "red" }}>{errorImage}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="flatID">Flat ID:</label>
                    <select
                          className="form-control"
                          id="flatID"
                          name="flatID"
                          value={userData.FlatId}
                          onChange={handleFlatIdChange}
                        >
                          <option>Select Available Flats</option>
                          {flats.map(flat => (
                            <option key={flat._id} value={flat._id}>
                              {flat.FirstName}
                            </option>
                          ))}
                        </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <label htmlFor="FlatNumber">Relation With Owner : </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Relation"
                      value={userData.RelationOfMember}
                      onChange={(e) => setuserData({ ...userData, RelationOfMember: e.target.value })}
                      
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                      <label htmlFor="allotmentDate">Upload Proof:</label>
                            <input
                            type="file"
                            className="form-control"
                            id="Image2"
                            name="Image2"
                            accept="image/*" // Specify the file types accepted
                            onChange={(e) => handleImage2Change(e)}
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
export default AddMember;
