import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        console.warn("Backend down. Falling back to Mock Doctor list.");
        let localDoctors = localStorage.getItem("mock_registered_doctors");
        if (!localDoctors) {
          const defaultDoctors = [
            {
              _id: "doc1",
              firstName: "John",
              lastName: "Doe",
              email: "john.doe@medibook.com",
              phone: "9876543211",
              dob: "1980-05-12",
              doctorDepartment: "Pediatrics",
              nic: "1234567890",
              gender: "Male",
              docAvatar: { url: "/doc1.jpg" }
            },
            {
              _id: "doc2",
              firstName: "Jane",
              lastName: "Smith",
              email: "jane.smith@medibook.com",
              phone: "9876543212",
              dob: "1984-09-21",
              doctorDepartment: "Orthopedics",
              nic: "1234567891",
              gender: "Female",
              docAvatar: { url: "/doc2.jpg" }
            },
            {
              _id: "doc3",
              firstName: "Robert",
              lastName: "Johnson",
              email: "robert.johnson@medibook.com",
              phone: "9876543213",
              dob: "1978-11-03",
              doctorDepartment: "Cardiology",
              nic: "1234567892",
              gender: "Male",
              docAvatar: { url: "/doc3.jpg" }
            },
            {
              _id: "doc4",
              firstName: "Emily",
              lastName: "Davis",
              email: "emily.davis@medibook.com",
              phone: "9876543214",
              dob: "1986-02-15",
              doctorDepartment: "Neurology",
              nic: "1234567893",
              gender: "Female",
              docAvatar: { url: "/doc4.webp" }
            },
            {
              _id: "doc5",
              firstName: "Michael",
              lastName: "Brown",
              email: "michael.brown@medibook.com",
              phone: "9876543215",
              dob: "1982-07-30",
              doctorDepartment: "Oncology",
              nic: "1234567894",
              gender: "Male",
              docAvatar: { url: "/doc5.jpg" }
            }
          ];
          localStorage.setItem("mock_registered_doctors", JSON.stringify(defaultDoctors));
          localDoctors = JSON.stringify(defaultDoctors);
        }
        setDoctors(JSON.parse(localDoctors));
      }
    };
    fetchDoctors();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }
  return (
    <section className="page doctors">
      <h1>DOCTORS</h1>
      <div className="banner">
        {doctors && doctors.length > 0 ? (
          doctors.map((element) => {
            return (
              <div className="card">
                <img
                  src={element.docAvatar && element.docAvatar.url ? element.docAvatar.url : "/docHolder.jpg"}
                  alt="doctor avatar"
                />
                <h4>{`${element.firstName} ${element.lastName}`}</h4>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Registered Doctors Found!</h1>
        )}
      </div>
    </section>
  );
};

export default Doctors;
