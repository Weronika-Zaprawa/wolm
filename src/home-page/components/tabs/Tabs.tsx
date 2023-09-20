import { useState } from "react";
import "./Tabs.scss";

type TabName = "fruits" | "vegetables";

function Tabs() {
  const [activeTabName, setActiveTabName] = useState<TabName>("fruits");

  // const handleTabClick = (tabName: TabName) => {
  //   setActiveTabName(tabName);

  //   if (activeTabName != tabName) {
  //     console.log(tabName);
  //   }
  // };
  function handleTabClick(plants: TabName) {
    if (activeTabName != plants) {
      setActiveTabName(plants);
    }
  }

  return (
    <div className="tabs-wrapper">
      <div
        // className={`tab-item ${activeTabName === "fruits" ? "active" : ""}`}
        className={"tab-item " + (activeTabName === "fruits" ? "active" : "")}
        onClick={() => handleTabClick("fruits")}
      >
        + Owoce
      </div>
      <div
        className={`tab-item ${activeTabName === "vegetables" ? "active" : ""}`}
        onClick={() => handleTabClick("vegetables")}
      >
        Warzywa
      </div>
    </div>
  );
}
export default Tabs;
