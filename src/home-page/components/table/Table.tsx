import { useState } from "react";
import "./Table.scss";
import DeleteModal from "../delete-modal/DeleteModal";
import EditModal from "../edit-modal/EditModal";
import { useHarvest } from "../../services/HarvestContext";
import BinIcon from "../../../images/icons/bin";
import PencilIcon from "../../../images/icons/pencil";
import LeftArrowIcon from "../../../images/icons/leftArrow";
import RightArrowIcon from "../../../images/icons/rightArrow";

function Table() {
  const [editModalVisible, setEditModalVisible] = useState<Boolean>(false);
  const [fruitToDeleteId, setFruitToDeleteId] = useState<string | null>(null);

  const { fruits, getFruits } = useHarvest();
  const { dictionary } = useHarvest();

  const handleClickOnBin = (fruitId: string) => {
    setFruitToDeleteId(fruitId);
  };
  const handleClickOnPencil = () => setEditModalVisible(true);

  const index = Number(fruits.pagination.page);
  const canGetNextPage = index < Number(fruits.pagination.pages_total) - 1;
  const canGetPreviousPage = index > 0;

  function getNextPage() {
    if (canGetNextPage) {
      getFruits(index + 1);
    }
  }

  function getPreviousPage() {
    if (canGetPreviousPage) {
      getFruits(index - 1);
    }
  }

  console.log(dictionary);

  return (
    <div>
      <div className="table-container">
        {fruits.loading === true && (
          <div className="is-loading">
            <div className="loading-spinner">
              <div className="spin">
                <div></div>
              </div>
            </div>
          </div>
        )}
        <table>
          <thead>
            <tr className="header-row">
              <th>Nazwa</th>
              <th>Odmiana</th>
              <th>Ilość</th>
              <th>Data zbioru</th>
              <th>Stan</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fruits.data.length === 0 && (
              <tr className="BBC">
                {!fruits.loading && (
                  <td colSpan={8}>
                    <h2>Brak dodanych owoców</h2>
                  </td>
                )}
              </tr>
            )}
            {fruits.data.map((fruit) => {
              return (
                <tr>
                  <td>
                    <p>{fruit.name}</p>
                    {fruit.additional_information}
                  </td>
                  <td>{fruit.variety}</td>
                  <td>
                    {fruit.amount}
                    {fruit.amount_unit}
                  </td>
                  <td>{fruit.harvest_date}</td>
                  <td>
                    <div className="pill">• {fruit.freshness}</div>
                  </td>
                  <td>
                    <div className="icon-container">
                      <div
                        className="icon"
                        onClick={() => handleClickOnBin(fruit.id)}
                      >
                        <BinIcon />
                      </div>
                      <div
                        className="icon"
                        onClick={() => handleClickOnPencil()}
                      >
                        <PencilIcon />
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="footer">
          <div className="page-number">
            Strona {index + 1} z {fruits.pagination.pages_total}
          </div>
          <div className="page-changer">
            <div
              className={
                "arrow " +
                (fruits.loading || !canGetPreviousPage ? "disabled" : "")
              }
              onClick={getPreviousPage}
            >
              <LeftArrowIcon />
            </div>
            <div
              className={
                "arrow " + (fruits.loading || !canGetNextPage ? "disabled" : "")
              }
              onClick={getNextPage}
            >
              <RightArrowIcon />
            </div>
          </div>
        </div>
      </div>
      {fruitToDeleteId ? (
        <DeleteModal
          setFruitToDeleteId={setFruitToDeleteId}
          fruitToDeleteId={fruitToDeleteId}
        />
      ) : null}
      {editModalVisible ? (
        <EditModal setEditModalVisible={setEditModalVisible} />
      ) : null}
    </div>
  );
}

export default Table;
