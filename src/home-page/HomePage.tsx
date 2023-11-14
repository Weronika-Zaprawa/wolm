import "./HomePage.scss";
import TopBar from "./components/top-bar/TopBar";
import Tabs from "./components/tabs/Tabs";
import TableFilters from "./components/table-filters/TableFilters";
import Table from "./components/table/Table";
import { HarvestProvider } from "./services/HarvestContext";

function HomePage() {
  return (
    <div className="home-page-wrapper">
      <HarvestProvider>
        <>
          <TopBar />
          <Tabs />
          <TableFilters />
          <Table />
        </>
      </HarvestProvider>
    </div>
  );
}

export default HomePage;
