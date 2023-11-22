import { useHarvest } from "../../services/HarvestContext";
import "./TableFilters.scss";

function TableFilters() {
  const { getFruits, fruits, searchFruitValue, setSearchFruitValue } =
    useHarvest();

  return (
    <div className="table-filters-container">
      <div className="custom-input-container">
        🔍
        <input
          className="custom-input"
          placeholder="Szukaj na podstawie nazwy"
          type="text"
          value={searchFruitValue}
          onChange={(e) => setSearchFruitValue(e.target.value)}
        />
      </div>
      <div className="buttons-container">
        <div
          className={"secondary-button " + (fruits.loading ? "disabled" : "")}
          onClick={() => {
            getFruits(fruits.pagination.page);
          }}
        >
          Odśwież
        </div>
        <div className="secondary-button">🐕‍🦺 Filtruj</div>
      </div>
    </div>
  );
}

export default TableFilters;
