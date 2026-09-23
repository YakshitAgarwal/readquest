import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import axios from "axios";

const Sponsors = ({ user, setUser }) => {
  const [companyNames, setCompanyNames] = useState([]);

  useEffect(() => {
    const getCompanyNames = async () => {
      try {
        const { data } = await axios.get("/api/companies/names");

        const names = data.map((company) => company.name);

        setCompanyNames(names);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      }
    };

    getCompanyNames();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#f9f9f9] p-6">
      <div className="flex justify-center">
        <Navbar user={user} setUser={setUser} />
      </div>
      <div className="mt-36">
        <Carousel
          text={companyNames.join(" ✦ ")}
          shape="line"
          speed={50}
          direction="forward"
          separator="✦"
          curviness={90}
          fontSize={46}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="black"
          ribbonWidth={86}
          pauseOnHover={false}
        />
      </div>
      <div className="">
        <Carousel
          text={companyNames.join(" ✦ ")}
          shape="line"
          speed={50}
          direction="reverse"
          separator="✦"
          curviness={90}
          fontSize={46}
          fontWeight={800}
          letterSpacing={2}
          uppercase
          color="#ffffff"
          ribbon
          ribbonColor="black"
          ribbonWidth={86}
          pauseOnHover={false}
        />
      </div>
    </div>
  );
};

export default Sponsors;
