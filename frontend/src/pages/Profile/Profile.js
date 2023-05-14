import React, { useContext, useState, useEffect } from 'react'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import { useParams } from 'react-router-dom'
import Spiner from "../../components/Spiner/Spiner"
import { NavLink } from 'react-router-dom';
import { singleUsergetfunc, deletfunc } from "../../services/Apis"
import Alert from 'react-bootstrap/Alert';
import { updateData } from '../../components/context/ContextProvider';
import { BASE_URL } from '../../services/helper'
import moment from "moment"
import "./profile.css"

const Profile = () => {

  const [userprofile, setUserProfile] = useState({});
  const [showspin, setShowSpin] = useState(true);
  const { update, setUpdate } = useContext(updateData);
  // const { delete, setDelete } = useContext(deleteData);



  const { id } = useParams();

  const userProfileGet = async () => {
    const response = await singleUsergetfunc(id);

    if (response.status === 200) {
      setUserProfile(response.data)
    } else {
      console.log("error");
    }
  }

  const userProfileDel = async () => {
    const response = await deletfunc(id);

    if (response.status === 200) {
      setUserProfile(response.data)
      alert("Deleted successfully");
      // window.location.href = www.google.com
      window.open('/register', '_blank');
    } else {
      console.log("error");
    }
  }


  useEffect(() => {
    userProfileGet();
    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [id])


  return (

    <>
      {
        update ? <Alert variant="primary" onClose={() => setUpdate("")} dismissible>{update.fname.toUpperCase()} Succesfully Update</Alert > : ""
      }
      {
        showspin ? <Spiner /> :
          <div className="container">

            <div className='container d-flex justify-content-center mt-5 p-3 rounded-3'>
              <h2>Your Appointment Has Been Successfully Done!!</h2>
            </div>
            <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
              <Card.Body>
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center">
                      <img src={`${BASE_URL}/uploads/${userprofile.profile}`} alt="" />
                    </div>
                  </div>
                </Row>


                <div className='text-left'>
                  <div style={{ marginLeft: '25%' }}>
                    <h3>{userprofile.fname + userprofile.lname}</h3>
                    <h5><i class="fa-solid fa-envelope email"></i>&nbsp;&nbsp; <span>{userprofile.email}</span> </h5>
                    <h5><i class="fa-solid fa-mobile"></i>&nbsp;&nbsp; <span>{userprofile.mobile}</span> </h5>
                    <h5><i class="fa-solid fa-person"></i>&nbsp;&nbsp; <span>{userprofile.gender}</span> </h5>
                    <h5><i class="fa-solid fa-location-pin location"></i>&nbsp;&nbsp; <span>{userprofile.location}</span> </h5>

                    <h5><i class="fa-solid fa-calendar-days calendar"></i>&nbsp;&nbsp;Date Created&nbsp;&nbsp; <span>{moment(userprofile.datecreated).format("DD-MM-YYYY")}</span> </h5>
                    <h5> <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;&nbsp;Date Updated&nbsp;&nbsp; <span>{userprofile.dateUpdated}</span> </h5>
                  </div>
                </div>

              </Card.Body>
            </Card>

            <center className='mt-5'>

              <NavLink className="btn-Edit" to={`/edit/${userprofile._id}`} style={{ textDecoration: 'none' }}>
                Edit your Appoinment
              </NavLink>
              &nbsp;

              <NavLink className="btn-Delete" onClick={userProfileDel} style={{ textDecoration: 'none' }}>
                Delete your Appoinment
              </NavLink>


            </center>
          </div >
      }

    </>
  )
}

export default Profile

