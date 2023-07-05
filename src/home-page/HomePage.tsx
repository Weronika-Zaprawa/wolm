import "./HomePage.scss";
import TopBar from "./components/top-bar/TopBar";
import Tabs from "./components/tabs/Tabs";
import TableFilters from "./components/table-filters/TableFilters";

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <TopBar />
      <Tabs />
      <TableFilters />
    </div>
  );
}

export default HomePage;
