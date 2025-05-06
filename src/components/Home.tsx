import { Box, Typography } from "@mui/material";
import cake1 from "../pictures/cake1.jpg";
import cake2 from "../pictures/cake2.jpg";
import cake3 from "../pictures/cake3.jpg";
import AboutUs from "./aboutUs";
import Header from "./header";

const Home = () => {
  return (
<>
<Header />
      <div >
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
        <AboutUs/>
      </div>
      </>
  );
};
export default Home;
