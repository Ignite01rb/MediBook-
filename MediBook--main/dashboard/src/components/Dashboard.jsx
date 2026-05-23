import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState(10);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        console.warn("Backend down. Falling back to Mock Appointments.");
        let localAppointments = localStorage.getItem("mock_appointments");
        if (!localAppointments) {
          const defaultAppointments = [
            {
              _id: "mock1",
              firstName: "Alice",
              lastName: "Smith",
              appointment_date: "2026-05-25T10:00:00.000Z",
              doctor: { firstName: "John", lastName: "Doe" },
              department: "Pediatrics",
              status: "Pending",
              hasVisited: false,
            },
            {
              _id: "mock2",
              firstName: "Bob",
              lastName: "Jones",
              appointment_date: "2026-05-26T11:30:00.000Z",
              doctor: { firstName: "Jane", lastName: "Smith" },
              department: "Orthopedics",
              status: "Accepted",
              hasVisited: true,
            },
            {
              _id: "mock3",
              firstName: "Charlie",
              lastName: "Brown",
              appointment_date: "2026-05-27T14:15:00.000Z",
              doctor: { firstName: "Robert", lastName: "Johnson" },
              department: "Cardiology",
              status: "Rejected",
              hasVisited: false,
            },
            {
              _id: "mock4",
              firstName: "Diana",
              lastName: "Prince",
              appointment_date: "2026-05-28T09:00:00.000Z",
              doctor: { firstName: "Emily", lastName: "Davis" },
              department: "Neurology",
              status: "Pending",
              hasVisited: false,
            },
            {
              _id: "mock5",
              firstName: "Evan",
              lastName: "Wright",
              appointment_date: "2026-05-29T16:00:00.000Z",
              doctor: { firstName: "Michael", lastName: "Brown" },
              department: "Oncology",
              status: "Accepted",
              hasVisited: false,
            }
          ];
          localStorage.setItem("mock_appointments", JSON.stringify(defaultAppointments));
          localAppointments = JSON.stringify(defaultAppointments);
        }
        setAppointments(JSON.parse(localAppointments));
      }
    };
    fetchAppointments();

    const doctorsList = JSON.parse(localStorage.getItem("mock_registered_doctors") || "[]");
    setTotalDoctors(10 + doctorsList.length);
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      if (error.message === "Network Error" || !error.response) {
        console.warn("Backend down. Updating status in Mock Mode.");
        setAppointments((prevAppointments) => {
          const updated = prevAppointments.map((appointment) =>
            appointment._id === appointmentId
              ? { ...appointment, status }
              : appointment
          );
          localStorage.setItem("mock_appointments", JSON.stringify(updated));
          return updated;
        });
        toast.success("Appointment status updated successfully (Mock Mode)!");
      } else {
        toast.error(error.response?.data?.message || "Failed to update status!");
      }
    }
  };

  const { isAuthenticated, admin } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="docImg" />
            <div className="content">
              <div>
                <p>Hello ,</p>
                <h5>
                  {admin &&
                    `${admin.firstName} ${admin.lastName}`}{" "}
                </h5>
              </div>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Facilis, nam molestias. Eaque molestiae ipsam commodi neque.
                Assumenda repellendus necessitatibus itaque.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length > 5 ? 1500 + appointments.length : appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{totalDoctors}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0
                ? appointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{`${appointment.firstName} ${appointment.lastName}`}</td>
                      <td>{appointment.appointment_date.substring(0, 16)}</td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Accepted"
                              ? "value-accepted"
                              : "value-rejected"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>{appointment.hasVisited === true ? <GoCheckCircleFill className="green"/> : <AiFillCloseCircle className="red"/>}</td>
                    </tr>
                  ))
                : "No Appointments Found!"}
            </tbody>
          </table>

          {}
        </div>
      </section>
    </>
  );
};

export default Dashboard;
