import { useCallback, useState } from "react";
import { useHarvest } from "../../services/HarvestContext";
import "./TableFilters.scss";
import { debounce } from "lodash";
import { MagnifierIcon } from "../../../images/icons";
import { XCircleIcon } from "../../../images/icons";
import AddModal from "../add-modal/AddModal";

function TableFilters() {
  const [nameFilterValue, setNameFilterValue] = useState<string>();
  const { getFruits, fruits, setSearchFruitValue } = useHarvest();

  const [addModalVisible, setAddModalVisible] = useState<Boolean>(false);
  const handleClickOnAdd = () => setAddModalVisible(true);

  const debouncedChange = useCallback(
    debounce((e) => setSearchFruitValue(e.target.value.trim()), 700),
    []
  );

  function handleNameFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedChange(e);
    setNameFilterValue(e.target.value);
  }

  function handleCancelIcon() {
    setSearchFruitValue("");
    setNameFilterValue("");
  }

  return (
    <div className="table-filters-container">
      <div className="custom-input-container">
        <MagnifierIcon />
        <input
          className="custom-input"
          placeholder=" Szukaj na podstawie nazwy"
          type="text"
          value={nameFilterValue}
          onChange={handleNameFilterChange}
        />
        <div
          className={
            "cancel-icon " + (!nameFilterValue?.length ? "notVisible" : "")
          }
          onClick={() => {
            handleCancelIcon();
          }}
        >
          <XCircleIcon />
        </div>
      </div>
      <div className="buttons-container">
        <div className="primary-button" onClick={() => handleClickOnAdd()}>
          Dodaj
        </div>
        <div
          className={"secondary-button " + (fruits.loading ? "disabled" : "")}
          onClick={() => {
            getFruits(fruits.pagination.page);
          }}
        >
          Odśwież
        </div>

        <div>
          {addModalVisible ? (
            <AddModal setAddModalVisible={setAddModalVisible} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default TableFilters;
