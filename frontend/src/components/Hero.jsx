import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
          Introducing HealConnect, the pioneering online healthcare platform redefining medical accessibility. Offering appointment booking, virtual consultations, and AI-driven medical guidance, HealConnect ensures affordable care through membership options. Empowering both patients and doctors with flexibility and social impact initiatives, HealConnect is revolutionizing healthcare access in India and globally, fostering improved health outcomes for all.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;