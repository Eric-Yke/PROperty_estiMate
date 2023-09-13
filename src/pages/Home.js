import React from "react";
import NavBar from "../components/NavBar/NavBar";
import Search from "../components/Search/Search";
import HomepageLineChart from "../components/HomepageLineChart/HomepageLineChart";
import HomepageInfoTable from "../components/HomepageInfoTable/HomepageInfoTable";
import Footer from "../components/Footer/Footer";
import Chatbot from "../components/ChatBox/ChatBox";


export default function Home() {
  return (
    <>
      <NavBar />
      <Search />
      <HomepageLineChart />
      <HomepageInfoTable />
      <Chatbot />
      <Footer />
    </>
  );
}
