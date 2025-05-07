import cake1 from "../images/cake1.jpg";
import cake2 from "../images/cake2.jpg";
import cake3 from "../images/cake3.jpg";
import AboutUs from "./aboutUs";
import Header from "../components/header";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <img
          src={cake1}
          alt="description"
          style={{
            width: "500px",
            height: "auto",
            margin: "  0px 15px",
          }}
        />
        <img
          src={cake2}
          alt="description"
          style={{
            width: "510px",
            height: "auto",
            margin: "  0px 15px",
          }}
        />
        <img
          src={cake3}
          alt="description"
          style={{
            width: "600px",
            height: "auto",
            margin: "0px 15px",
          }}
        />
        <AboutUs />
      </div>
    </>
  );
};
export default Home;
