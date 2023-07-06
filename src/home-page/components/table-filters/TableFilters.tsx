import "./TableFilters.scss";

function TableFilters() {
  return (
    <div className="table-filters-container">
      <div className="custom-input-container">
        🔍
        <input
          className="custom-input"
          placeholder="Szukaj na podstawie nazwy"
        />
      </div>
      <div className="secondary-button">🐕‍🦺 Filtruj</div>
    </div>
  );
}

export default TableFilters;
