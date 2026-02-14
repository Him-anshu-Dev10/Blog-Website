import React from "react";
import Navbar from "../Navbar";
import Header from "../Header";
import { assets } from "../../assets/assets";
import Bloglist from "../Bloglist";
import NewsLetter from "../NewsLetter";
import Footer from "../Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <NewsLetter />
      <Footer />
    </>
  );
};

export default Home;
