import About from "../components/about";
import CourseCategories from "../components/course-categories";
import Features from "../components/features";
import Participants from "../components/participants";
import Header from "../components/header";
import Navbar from "../components/navbar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Participants />
      <About />
      <Features />
      <CourseCategories />
    </>
  );
};

export default Home;
