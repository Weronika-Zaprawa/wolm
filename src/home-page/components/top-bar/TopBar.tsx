import { useState } from "react";
import "./TopBar.scss";
import { useAuth } from "../../services/AuthContext";

function TopBar() {
  const { deleteTokens } = useAuth();
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
        <button
          className="logout-button"
          onClick={() => {
            deleteTokens();
          }}
        >
          Wyloguj się
        </button>
      </div>
    </div>
  );
}

export default TopBar;
