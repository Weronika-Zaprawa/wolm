import "./Tabs.scss";
import { useHarvest } from "../../services/HarvestContext";

type TabName = "fruits" | "vegetables";

function Tabs() {
  const { activeTabName, setActiveTabName, getFruits, fruits } = useHarvest();

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
        Owoce
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
