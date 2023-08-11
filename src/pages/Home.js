import React from "react";
import NavBar from '../components/NavBar/NavBar';
import Search from '../components/Search/Search';
import InfoSection from '../components/Content/Content';
import Footer from '../components/Footer/Footer';



const Home = () => {
  return (
    <>
      <NavBar />
      <Search />
      <InfoSection />
      <Footer />
    </>
  );
};

export default Home;
