import "./HomePage.scss";
import TopBar from "./components/top-bar/TopBar";
import Tabs from "./components/tabs/Tabs";
import TableFilters from "./components/table-filters/TableFilters";
import Table from "./components/table/Table";
import DeleteModal from "./components/delete-modal/DeleteModal";

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <TopBar />
      <Tabs />
      <TableFilters />
      <Table />
      <DeleteModal />
    </div>
  );
}

export default HomePage;
