import AdminSidebar from "../Admin/AdminSidebar";
import Swal from 'sweetalert2';
import axios from "axios";
import React, { useState, useEffect } from 'react';
axios.defaults.baseURL = "http://localhost:4000/";
function ManageVisitor() {
  
  const [users, setUsers] = useState([]);
    useEffect(() => {
      // Fetch User data from the backend API
      axios.get('/Visitor')
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
  function formatDate(inputDate) {
    const date = new Date(inputDate);
  
    // Extract date components
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
    const year = String(date.getFullYear()).slice(2); // Get last two digits of the year
  
    // Extract time components
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  }
  
   

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
            <span className="dashboard">Manage Visitor</span>
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
              <div className="title">Visitor Details</div>
                <div className="button " >
                  <a href="/AddVisitor"style={{background:"Green",marginRight:"35px"}}> Add New Visitor </a>
                </div>            
              <div className="sales-details">
                <table className="details" style={{width:"100%",display:"block"}}>
                  <thead>
                    <tr>
                   
                        <th className="topic">VisitorId</th>
                        <th className="topic">VisitorName</th>
                        <th className="topic">MobileNumber</th>
                        <th className="topic">Adress</th>
                        <th className="topic">FlatId</th>
                        <th className="topic">WhomToMeet</th>
                        <th className="topic">EntryTime</th>
                        <th className="topic">ExitTime</th>
                        <th className="topic">Duration<br></br><sub>(in a minutes)</sub></th>
                        <th className="topic">Proof</th>
                        <th className="topic">Outing Remark</th>
                        <th className="topic">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                     {/* loop stats here */}
                     {users.map(user => (
                    <tr className="details" key={user._id}>
                        <td>{user._id}</td>
                       <td>{user.VisitorName}</td>
                        <td>{user.MobileNumber}</td>
                        <td>{user.Adress}</td>
                        <td>{user.FlatId}</td>
                        <td>{user.WhomToMeet}</td>
                        <td>{user.EntryTime && (formatDate(user.EntryTime))}</td>
                        <td>{user.ExitTime && (formatDate(user.ExitTime))}</td>
                        <td>{user.Duration}</td>
                        <td>{user.Proof}</td>
                        <td>{user.Remark}</td>
                        <td style={{textAlign:"left"}}>
                        {user.Status === false ? ( 
                            <>
                              <div className="button">
                                 <a href={`EditVisitor/${user._id}`} style={{background:"Red"}}> In </a>
                                  <span style={{marginRight:"5px"}}></span>
                              </div> 
                            </>
                            ) : (
                              <>
                              <div className="button">
                                 <a href="#" style={{background:"Green"}}> Out </a>
                                  <span style={{marginRight:"5px"}}></span>
                              </div> 
                            </>
                          )}
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
export default ManageVisitor;
