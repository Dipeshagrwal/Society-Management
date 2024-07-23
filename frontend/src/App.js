import React, { useState } from 'react';
import AdminHomepage from './Components/Admin/AdminHomepage';
import {Routes,Route} from "react-router-dom";
import ManageFlat from './Components/Admin/ManageFlat';
import AddFlat from './Components/Admin/AddFlat';
import AddAdmin from './Components/Admin/AddAdmin';
import AddMember from './Components/Admin/AddMember';
import AddSecurity from './Components/Admin/AddSecurity';
import AddOwner from './Components/Admin/AddOwner';
import EditFlat from './Components/Admin/EditFlat';
import ManageUser from './Components/Admin/ManageUser';
import EditUser from './Components/Admin/EditUser';
import AdminLogin from './Components/Admin/Login';
import ManageVisitor from './Components/Admin/ManageVisitor';
import AddVisitor from './Components/Admin/AddVisitor';
import EditVisitor from './Components/Admin/EditVisitor';
import EditAdmin from './Components/Admin/EditAdmin';
import EditSecurity from './Components/Admin/EditSecurity';
import EditOwner from './Components/Admin/EditOwner';
import EditMember from './Components/Admin/EditMember';
import AddComplain from './Components/Residents/AddComplain';
function App() {
  return (
    <>
    <Routes>
      <Route exact path="/AddComplain" Component={AddComplain}></Route>

      <Route exact path="/" Component={AdminHomepage}></Route>
      <Route exact path="/Flat" Component={ManageFlat}></Route>
      <Route exact path="/AddFlat" Component={AddFlat}></Route>
      <Route exact path="/EditFlat/:id" Component={EditFlat}></Route>

      <Route exact path="/User" Component={ManageUser}></Route>
      <Route exact path="/AddAdmin" Component={AddAdmin}></Route>
      <Route exact path="/AddSecurity" Component={AddSecurity}></Route>
      <Route exact path="/AddOwner" Component={AddOwner}></Route>
      <Route exact path="/AddMember" Component={AddMember}></Route>
      
      <Route exact path="/EditAdmin/:id" Component={EditAdmin}></Route>
      <Route exact path="/EditSecurity/:id" Component={EditSecurity}></Route>
      <Route exact path="/EditOwner/:id" Component={EditOwner}></Route>
      <Route exact path="/EditMember/:id" Component={EditMember}></Route>
      
      <Route exact path="/Visitor" Component={ManageVisitor}></Route>
      <Route exact path="/AddVisitor" Component={AddVisitor}></Route>
      <Route exact path="/EditVisitor/:id" Component={EditVisitor}></Route>

      <Route exact path="/Allotment" Component={AdminHomepage}></Route>
      <Route exact path="/Bill" Component={AdminHomepage}></Route>
      <Route exact path="/Complain" Component={AdminHomepage}></Route>

      
      <Route exact path="/Login" Component={AdminLogin}></Route>
      <Route exact path="/Logout"></Route>
    </Routes>
    </>
  );
}

export default App;
