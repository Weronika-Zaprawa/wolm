import { useState } from "react";
import "./TopBar.scss";
import AddModal from "../add-modal/AddModal";

function TopBar() {
  const [addModalVisible, setAddModalVisible] = useState<Boolean>(false);
  const handleClickOnAdd = () => setAddModalVisible(true);
  return (
    <div className="top-bar">
      <div className="top-bar-left-side">
        <div className="top-bar-left-side-upper">
          <span>Plony</span>
        </div>
        <div className="top-bar-left-side-lower">
          <span>Kontroluj stan zebranych plonów</span>
        </div>
      </div>
      <div className="top-bar-right-side">
        <div className="primary-button" onClick={() => handleClickOnAdd()}>
          + Dodaj
        </div>
      </div>
      {addModalVisible ? (
        <AddModal setAddModalVisible={setAddModalVisible} />
      ) : null}
    </div>
  );
}

export default TopBar;
