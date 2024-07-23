import React, { useState } from 'react';
function AdminSidebar(){
    
    return(<>
   <div className="sidebar">
      <div className="logo-details">
        <i className="bx bx-user-circle"></i>
        <span className="logo_name">Admin</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="/" className="active">
            <i className="bx bx-grid-alt"></i>
            <span className="links_name">Dashboard</span>
          </a>
        </li>
        <li>
          <a href="/Flat">
            <i className="bx bx-building-house"></i>
            <span className="links_name">Flats Allotment</span>
          </a>
        </li>
        <li>
          <a href="/User">
            <i className=" bx bxs-group"></i>
            <span className="links_name">Users</span>
          </a>
        </li>
        {/* <li>
          <a href="/Allotment">
            <i className="bx bx-list-ul"></i>
            <span className="links_name">Allotment</span>
          </a>
        </li> */}
        <li>
          <a href="/Bill">
            <i className="bx bx-receipt"></i>
            <span className="links_name">Bills</span>
          </a>
        </li>
        <li>
          <a href="/Complain">
            <i className="bx bx-chat"></i>
            <span className="links_name">View Complain</span>
          </a>
        </li>
        <li>
          <a href="/Visitor">
            <i className="bx bx-id-card"></i>
            <span className="links_name">Visitors</span>
          </a>
        </li>
        <li>
          <a href="/Search">
            <i className="bx bx-search-alt-2"></i>
            <span className="links_name">Search</span>
          </a>
        </li>
        <li>
          <a href="/Report">
            <i className="bx bx-folder-open"></i>
            <span className="links_name">Report</span>
          </a>
        </li>
        
        <li className="log_out">
          <a href="/Logout">
            <i className="bx bx-log-out"></i>
            <span className="links_name">Log out</span>
          </a>
        </li>
      </ul>
    </div>

    </>)
}
export default AdminSidebar;