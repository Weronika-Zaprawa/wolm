import "./HomePage.scss";

function HomePage() {
  return (
    <div className="home-page-wrapper">
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
          <div className="primary-button">+ Dodaj</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
