import { useState } from "react";

import FeedBody from "./FeedBody";
import SideBar from "./SideBar";
import RightBar from "./RightBar";

export default function Body(props) {
 
  const [selectedDomain, setSelectedDomain] = useState(null);

  return (
    <section className="flex flex-col md:flex-row w-full ">
      <SideBar  setSelectedDomain={setSelectedDomain} />
      <FeedBody selectedDomain={selectedDomain} />
      <RightBar selectedDomain={selectedDomain} />
    </section>
  );
}
