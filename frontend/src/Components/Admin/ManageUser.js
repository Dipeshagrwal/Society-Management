import AdminSidebar from "./AdminSidebar";
import Swal from 'sweetalert2';
import axios from "axios";
import React, { useState, useEffect } from 'react';
axios.defaults.baseURL = "http://localhost:4000/";
function ManageFlat() {
  
  const [users, setUsers] = useState([]);

    useEffect(() => {
      // Fetch User data from the backend API
      axios.get('/User')
        .then(response => {
          setUsers(response.data);  
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
        axios.delete(`/deleteUser/${flatId}`)
          .then(response => {
            // Assuming you want to refresh the list of flats after deletion
            axios.get('/User')
              .then(response => {
                setUsers(response.data);
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
            <span className="dashboard">Manage User</span>
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
          <div className="sales-boxes" style={{width:"1950px",height:"670px",position:"fixed"}}>
            <div className="recent-sales box" style={{ overflowX:"auto"}}>  
              <div className="title">User Details</div>
                <div className="button" >
                  <a href="/AddAdmin"style={{background:"Green",marginRight:"35px"}}> Add New Admin </a>
                  <a href="/AddSecurity"style={{background:"Green",marginRight:"35px"}}> Add New Security </a>
                  <a href="/AddOwner"style={{background:"Green",marginRight:"35px"}}> Add New Owner </a>
                  <a href="/AddMember"style={{background:"Green",marginRight:"35px"}}> Add New Member </a>
                </div>            
              <div className="sales-details">
                <table className="details" style={{width:"100%",display:"block"}}>
                  <thead>
                    <tr>
                        <th className="topic">Image</th>
                        <th className="topic">User Name</th>
                        <th className="topic">Email Id</th>
                        <th className="topic">Phone Number</th>
                        <th className="topic">Access Type</th>
                        <th className="topic">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                     {/* loop stats here */}
                     {users.map(user => (
                    <tr className="details" key={user._id}>
                        <img src={user.Image} alt="No Image Available" style={{borderRadius:"5%",width:"150px",height:"150px",overflow:"hidden",justifyContent:"center"}}  />
                        <td>{user.FirstName}<br></br>{user.MiddleName}<br></br>{user.LastName}</td>
                        <td>{user.EmailId}</td>
                        <td>{user.MobileNumber}</td>
                        <td>{user.UserType}</td>
                        <td style={{textAlign:"left"}}>
                            <div className="button">
                                {/* <a href={`EditFlat`} className="primary"> Details </a><span style={{marginRight:"5px"}}></span> */}
                                <a href={`Edit${user.UserType}/${user._id}`} style={{background:"Orange"}}> Edit </a>
                                <span style={{marginRight:"5px"}}></span>
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
                                                  handleDelete(user._id);
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
                                          }}>
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
{/* <div className="button">
  <div className="dropdown">
    <a
      href="#"
      style={{
        background: "Green",
        marginRight: "35px",
        position: "relative", // Add relative positioning to the link
        display: "inline-block" // Ensure the link is inline-block to contain the dropdown content
      }}
    >
      Add New User
    </a>
    <div
      className="dropdown-content"
      style={{
        display: "none", // Hide the dropdown content by default
        position: "absolute", // Position it absolutely
        backgroundColor: "#f1f1f1",
        minWidth: "160px",
        boxShadow: "0px 8px 16px 0px rgba(0,0,0,0.2)",
        zIndex: 1
      }}
    >
      <a href="#">Option 1</a>
      <a href="#">Option 2</a>
      <a href="#">Option 3</a>
    </div>
  </div>
</div> */}
