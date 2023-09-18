import { useHarvest } from "../../services/HarvestContext";
import "./TableFilters.scss";

function TableFilters() {
  const { getFruits, fruits } = useHarvest();

  return (
    <div className="table-filters-container">
      <div className="custom-input-container">
        🔍
        <input
          className="custom-input"
          placeholder="Szukaj na podstawie nazwy"
        />
      </div>
      <div className="buttons-container">
        <div
          className={"secondary-button " + (fruits.loading ? "disabled" : "")}
          onClick={getFruits}
        >
          Odśwież
        </div>
        <div className="secondary-button">🐕‍🦺 Filtruj</div>
      </div>
    </div>
  );
}

export default TableFilters;
