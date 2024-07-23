
import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:4000/";
function AddFlat() {
    const [Flat, setFlat] = useState('');
    const [Floor, setFloor] = useState('');
    const [selectBlock, setSelectedBlock] = useState('A');
    const [selectFlatType, setSelectFlatType] = useState('1BHK');
    const [Maintenance, setMaintenance] = useState('');
    const [errorFlat, setErrorFlat] = useState( '');
    const [errorFloor, setErrorFloor] = useState(' ');
    const [errorMaintenance, setErrorMaintenance] = useState(' ');
    const validateFlatForm = (event) => {
        event.preventDefault();
        let a=Number(Flat);
        let b=Number(Floor);
        let c=Number(Maintenance);
        if ( b<1 || b>12) {
            setErrorFloor('Building have floors between 1 to 12');
        }
        else{
            setErrorFloor('');
        }
        if ( a<0) {
            setErrorFlat('Flat number can not be negetive or zero');
        }
        else{
            setErrorFlat('');
        }  
        if ( c<0) {
            setErrorMaintenance('Maintenance Can not be negetive');
        }
        else{
            setErrorMaintenance('');
        }  
      };
  
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
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (errorFlat || errorFloor || errorMaintenance) {
      // If there are errors, display a message to the user or handle it as needed
      return; // Prevent form submission
    }
  
    try {
      
       const response = await axios.post('/addFlat', {
        flatNo: Flat,
        floor: Floor,
        block: selectBlock,
        flatType: selectFlatType,
        maintenanceCharge: Maintenance,
       });
       setFlat('');
    setFloor('');
    setSelectedBlock('');
    setSelectFlatType('');
    setMaintenance('');
      // Show success message to the user
      Swal.fire({
        title: 'Success',
        text: response.data.message,
        icon: 'success',
        allowOutsideClick: false, // Prevent closing on outside click
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to the home page after clicking "OK"
          window.location.href = '/Flat'; // Replace '/' with the actual home page route
        }
      });
    } catch (error) {
      // Handle error
      console.error('Error adding flat:', error);
      Swal.fire('Error', 'An error occurred while adding flat data', 'error');
    }
  };

  return (
    <>
      <AdminSidebar></AdminSidebar>
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i
              className="bx bx-menu sidebarBtn"
              onClick={handleSidebarToggle}
            ></i>
            <span className="dashboard">Manage Flat</span>
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

        <div className="home-content">
          <div className="sales-boxes" style={{width:"1900px",height:"630px",position:"fixed"}}>
            <div className="recent-sales box">
                
              <div className="title">Add Flat Details</div>
            
                <form onSubmit={handleSubmit} onChange={validateFlatForm}>
                    <div className="form-group">
                        <label htmlFor="FlatNumber">Flat Number: </label>
                        <input type="number"
                         className="form-control" 
                         id="exampleInputEmail1" 
                         aria-describedby="emailHelp"
                         placeholder="Enter Flat Number"
                         value={Flat} 
                         onChange={(e) => setFlat(e.target.value)} 
                         required />
                        <p id="errorFlat" style={{ color: 'red' }}> {errorFlat}</p>
                        
                    </div>
                    <div className="form-group">
                        <label htmlFor="Flor">Floor: </label>
                        <input type="number" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter Floor number:" 
                        value={Floor} 
                        onChange={(e) => setFloor(e.target.value)} 
                        required />
                        <p id="errorFloor" style={{ color: 'red' }}>{errorFloor}</p>
                    </div>
                    <div className="form-group">
                    <div className="form-group col-md-6">
                        <label htmlFor="Block">Block Number: </label>
                        <select id="Block" 
                        className="form-control" 
                        value={selectBlock} 
                        onChange={(e) => setSelectedBlock(e.target.value)} 
                        required>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                    </select>
                    
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="FlatType">Flat Type:</label>
                    <select id="FlatType" 
                    className="form-control" 
                    value={selectFlatType} 
                    onChange={(e) => setSelectFlatType(e.target.value)} 
                    required>
                        <option>1BHK</option>
                        <option>2BHK</option>
                        <option>3BHK</option>
                    </select>
                    </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Maintenance">Maintenance Charge: </label>
                        <input type="number" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter Flat Number" 
                        value={Maintenance} 
                        onChange={(e) => setMaintenance(e.target.value)} 
                        required />
                        <p id="errorMaintenance" style={{ color: 'red' }}>{errorMaintenance}</p>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Flat</button>
                </form>
                           
              <div className="sales-details">
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default AddFlat;
