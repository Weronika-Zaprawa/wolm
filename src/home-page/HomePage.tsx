import "./HomePage.scss";
import TopBar from "./components/top-bar/TopBar";
import Tabs from "./components/tabs/Tabs";

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <TopBar />
      <Tabs />
    </div>
  );
}

export default HomePage;
