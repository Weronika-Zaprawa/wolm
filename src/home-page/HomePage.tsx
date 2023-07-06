import "./HomePage.scss";
import TopBar from "./components/top-bar/TopBar";
import Tabs from "./components/tabs/Tabs";
import TableFilters from "./components/table-filters/TableFilters";
import Table from "./components/table/Table";

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <TopBar />
      <Tabs />
      <TableFilters />
      <Table />
    </div>
  );
}

export default HomePage;
