
import AdminSidebar from './AdminSidebar';
import axios from "axios";
import React, { useState, useEffect } from 'react';
function AdminHomepage(){
  const [flatsCount, setFlatsCount] = useState(0);
  const [UsersCount, setUsersCount] = useState(0);
  const [VisitorCount, setVisitorCount] = useState(0);
  const [AllotmentCount, setAllotmentCount] = useState(0);

  useEffect(() => {
    async function fetchFlatsCount() {
      try {
        const response1 = await axios.get('/getFlatCount');
        const response4 = await axios.get('/getAllotmentCount');
        const response2 = await axios.get('/getUserCount');
        const response3 = await axios.get('/getVisitorCount');
        const flats = response1.data;
        const Users = response2.data;
        const Visitor = response3.data;
        const AllotmentCount = response4.data;
        setFlatsCount(flats.count);
        setUsersCount(Users.count);
        setVisitorCount(Visitor.count);
        setAllotmentCount(AllotmentCount.count);
      } catch (error) {
        console.error('Error fetching flats:', error);
      }
    }
    fetchFlatsCount();
  }, []);
  const handleSidebarToggle = () => {
    let sidebar = document.querySelector('.sidebar');
    let sidebarBtn = document.querySelector('.sidebarBtn');

    sidebar.classList.toggle('active');
    if (sidebar.classList.contains('active')) {
      sidebarBtn.classList.replace('bx-menu', 'bx-menu-alt-right');
    } else {
      sidebarBtn.classList.replace('bx-menu-alt-right', 'bx-menu');
    }
  };

    return(<>
    <AdminSidebar></AdminSidebar>
    <section className="home-section">
      <nav>
        <div className="sidebar-button">
          <i className="bx bx-menu sidebarBtn" onClick={handleSidebarToggle}></i>
          <span className="dashboard">Dashboard</span>
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
        <div className="overview-boxes">
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Flats</div>
              <div className="number">{flatsCount}</div>
              
            </div>
            <i className="bx bxs-building-house cart"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Bills</div>
              <div className="number">0</div>
              
            </div>
            <i className="bx bxs-receipt cart two"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Allotments</div>
              <div className="number">{AllotmentCount}</div>
             
            </div>
            <i className="bx bxs-group cart three"  ></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Visitors</div>
              <div className="number">{VisitorCount}</div>
              
            </div>
            <i className="bx bxs-face cart four"></i>
          </div>
        </div>
        <div className="overview-boxes">
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Users</div>
              <div className="number">{UsersCount}</div>
              
            </div>
            <i className="bx bxs-contact cart two"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Total Complains</div>
              <div className="number">0</div>
              
            </div>
            <i className="bx bxs-chat cart two"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Pending Complains</div>
              <div className="number">0</div>
              
            </div>
            <i className="bx bxs-comment-dots cart three"></i>
          </div>
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Resolved Complains</div>
              <div className="number">0</div>
              
            </div>
            <i className="bx bxs-comment-x cart four"></i>
          </div>
        </div>
      </div>
      </section>
    </>)
}
export default AdminHomepage;