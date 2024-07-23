import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from "axios";
import React, { useState, useEffect } from 'react';
axios.defaults.baseURL = "http://localhost:4000/";
function ManageFlat() {
  
    const [flats, setFlats] = useState([]);

    useEffect(() => {
      // Fetch flats data from the backend API
      axios.get('/Flat')
        .then(response => {
          setFlats(response.data);  
        })
        .catch(error => {
          console.error('Error fetching flats:', error);
        });
    }, []);

    const showAlert = () => {

        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          }
        });
      };
    const handleDelete = (flatId) => {
        axios.delete(`/deleteFlat/${flatId}`)
          .then(response => {
            // Assuming you want to refresh the list of flats after deletion
            axios.get('/Flat')
              .then(response => {
                setFlats(response.data);
              })
              .catch(error => {
                console.error('Error fetching flats:', error);
              });
          })
          .catch(error => {
            console.error('Error deleting flat:', error);
          });
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
            <i className="bx bx-search" style={{marginTop:"8px"}}></i>
          </div>
          <div className="profile-details">
            <img src="images/profile.jpg" alt="" />
            <span className="admin_name">Prem Shahi</span>
            <i className="bx bx-chevron-down"></i>
          </div>
        </nav>

        <div className="home-content">
          <div className="sales-boxes" style={{width:"1900px",height:"630px",position:"fixed"}}>
            <div className="recent-sales box" style={{ overflowX:"auto"}}>
                
              <div className="title">Flat Details</div>
            
              <div className="button " >
                                <a href="/AddFlat"style={{background:"Green",marginRight:"35px"}}> Add New Flat </a>
                            </div> 
                           
              <div className="sales-details">
                <table className="details" >
                    <thead>
                    <tr>
                        <th className="topic">Flat_id</th>
                        <th className="topic">Flat Number</th>
                        <th className="topic">Floor</th>
                        <th className="topic">Block</th>
                        <th className="topic">Flat Type</th>
                        <th className="topic">Maintenance Charge</th>
                        <th className="topic"></th>
                    </tr>
                    </thead>
                    <tbody>
                      {/* loop stats here */}
                    {flats.map(flat => (
                    <tr className="details" key={flat._id}>
                        <td style={{color: flat.status ? 'green' : 'red' }}>{flat.flatId}</td>
                        <td>{flat.flatNo}</td>
                        <td>{flat.floor} Floor</td>
                        <td>{flat.block}</td>
                        <td>{flat.flatType}</td>
                        <td>{flat.maintenanceCharge}</td>
                        <td style={{textAlign:"left"}}>
                            <div className="button">
                                <a href={`EditFlat/${flat._id}`} style={{background:"Orange"}}> Edit </a>
                                <span style={{marginRight:"6px"}}></span>
                                <a  href="#"
                                          style={{ background: "red" }}
                                          onClick={() => {
                                            return new Promise((resolve, reject) => {
                                              showAlert();
                                              Swal.fire({
                                                title: 'Are you sure?',
                                                text: "You won't be able to revert this!",
                                                icon: 'warning',
                                                showCancelButton: true,
                                                confirmButtonColor: '#3085d6',
                                                cancelButtonColor: '#d33',
                                                confirmButtonText: 'Yes, delete it!',
                                              }).then((result) => {
                                                if (result.isConfirmed) {
                                                  handleDelete(flat._id);
                                                  resolve(result); // Resolve the promise when user confirms
                                                  Swal.fire(
                                                    'Deleted!',
                                                    'Your file has been deleted.',
                                                    'success'
                                                  );
                                                } else {
                                                 
                                                }
                                              });
                                            });
                                          }}
                                        >
                                          Delete
                                        </a>

                            </div> 
                        </td>
                    </tr>
                    ))}
                    {/* loop ends here */}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ManageFlat;
