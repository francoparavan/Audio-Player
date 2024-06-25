import React from "react";
import MediaPlayer from "./MediaPlayer";
import bg from "../../img/bg-AP.png"

const Home = () => {
  return (
    <>

      <section style={{backgroundImage: `url(${bg})`}}>
        <MediaPlayer />
      </section>
    </>
  );
};

export default Home;
