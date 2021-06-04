import { useState } from "react";
import DomainBoard from "./DomainBoard";
function Body() {
  const [activeDomain, setActiveDomain] = useState("all");

  return (
    <section>
      <div class="flex justify-center">
        {" "}
        <DomainBoard setActiveDomain={setActiveDomain} />
      </div>
    </section>
  );
}
export default Body;
