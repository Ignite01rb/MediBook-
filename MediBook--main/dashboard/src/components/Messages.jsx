import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/message/getall",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.warn("Backend down. Falling back to Mock Messages.");
        let localMessages = localStorage.getItem("mock_received_messages");
        if (!localMessages) {
          const defaultMessages = [
            {
              _id: "msg1",
              firstName: "Alice",
              lastName: "Smith",
              email: "alice@gmail.com",
              phone: "1234567890",
              message: "Hi, I would like to reschedule my appointment from Monday to Tuesday if possible. Thanks!"
            },
            {
              _id: "msg2",
              firstName: "Bob",
              lastName: "Jones",
              email: "bob@gmail.com",
              phone: "1234567891",
              message: "Is Dr. Jane Smith available for consultation this Thursday afternoon?"
            },
            {
              _id: "msg3",
              firstName: "Charlie",
              lastName: "Brown",
              email: "charlie@gmail.com",
              phone: "1234567892",
              message: "Hello, do you accept international health insurance for cardiology consultations?"
            }
          ];
          localStorage.setItem("mock_received_messages", JSON.stringify(defaultMessages));
          localMessages = JSON.stringify(defaultMessages);
        }
        setMessages(JSON.parse(localMessages));
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="page messages">
      <h1>MESSAGE</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element) => {
            return (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>No Messages!</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
