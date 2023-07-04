import { useState } from "react";
import "./Tabs.scss";
import { type } from "os";

type TabName = "fruits" | "vegetables";

function Tabs() {
  const [activeTabName, setActiveTabName] = useState<TabName>("fruits");

  console.log(activeTabName);

  return (
    <div className="tabs-wrapper">
      <div
        className={`tab-item ${activeTabName === "fruits" ? "active" : ""}`}
        onClick={() => setActiveTabName("fruits")}
      >
        Owoce
      </div>
      <div
        className={`tab-item ${activeTabName === "vegetables" ? "active" : ""}`}
        onClick={() => setActiveTabName("vegetables")}
      >
        Warzywa
      </div>
    </div>
  );
}

export default Tabs;
