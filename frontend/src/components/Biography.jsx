import React from "react";

const Biography = ({imageUrl}) => {
  return (
    <>
      <div className="container biography">
        <div className="banner">
          <img src={imageUrl} alt="whoweare" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>Who We Are</h3>
          <p>
            
Heal-Connect traces its roots to a collective vision of transforming global healthcare accessibility. Founded by a team deeply committed to leveraging technology for social good, our platform revolutionizes the way individuals access medical services. Through innovative features such as appointment booking, virtual consultations, and AI-powered medical guidance, we prioritize affordability and inclusivity, ensuring quality care for all through membership options.
          </p>
          <p>We are all in 2024!</p>
          {/* <p>We are working on a MERN STACK PROJECT.</p> */}
          <p>
          At Heal-Connect, we are a passionate group of innovators dedicated to bridging the gap in healthcare access. Driven by a shared mission to democratize healthcare, we empower patients and providers alike with flexible solutions and social impact initiatives. Our commitment extends beyond the digital realm as we actively engage in initiatives to foster healthier communities. Heal-Connect isn't just a platform; it's a movement toward equitable healthcare, striving to improve health outcomes and transform lives globally.
          </p>
          {/* <p>Lorem ipsum dolor sit amet!</p>
          <p>Coding is fun!</p> */}
        </div>
      </div>
    </>
  );
};

export default Biography;