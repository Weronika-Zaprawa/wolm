import { useState } from "react";
import "./Table.scss";
import DeleteModal from "../delete-modal/DeleteModal";
import EditModal from "../edit-modal/EditModal";
import { useHarvest } from "../../services/HarvestContext";

function Table() {
  const [deleteModalVisible, setDeleteModalVisible] = useState<Boolean>(false);
  const handleClickOnBin = () => setDeleteModalVisible(true);

  const [editModalVisible, setEditModalVisible] = useState<Boolean>(false);
  const handleClickOnPencil = () => setEditModalVisible(true);

  const { fruits, getFruits } = useHarvest();

  console.log(fruits);

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
          <tr className="header-row">
            <th>Nazwa</th>
            <th>Odmiana</th>
            <th>Ilość</th>
            <th>Data zbioru</th>
            <th>Stan</th>
            <th></th>
          </tr>
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
                    <div className="icon" onClick={() => handleClickOnBin()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M2.5 5.00001H4.16667M4.16667 5.00001H17.5M4.16667 5.00001V16.6667C4.16667 17.1087 4.34226 17.5326 4.65482 17.8452C4.96738 18.1577 5.39131 18.3333 5.83333 18.3333H14.1667C14.6087 18.3333 15.0326 18.1577 15.3452 17.8452C15.6577 17.5326 15.8333 17.1087 15.8333 16.6667V5.00001H4.16667ZM6.66667 5.00001V3.33334C6.66667 2.89131 6.84226 2.46739 7.15482 2.15483C7.46738 1.84227 7.89131 1.66667 8.33333 1.66667H11.6667C12.1087 1.66667 12.5326 1.84227 12.8452 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M8.33333 9.16667V14.1667M11.6667 9.16667V14.1667"
                          stroke="#667085"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="icon" onClick={() => handleClickOnPencil()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_6355_510)">
                          <path
                            d="M14.1667 2.49999C14.3856 2.28112 14.6454 2.1075 14.9314 1.98905C15.2173 1.8706 15.5238 1.80963 15.8334 1.80963C16.1429 1.80963 16.4494 1.8706 16.7353 1.98905C17.0213 2.1075 17.2812 2.28112 17.5 2.49999C17.7189 2.71886 17.8925 2.97869 18.011 3.26466C18.1294 3.55063 18.1904 3.85713 18.1904 4.16665C18.1904 4.47618 18.1294 4.78268 18.011 5.06865C17.8925 5.35461 17.7189 5.61445 17.5 5.83332L6.25002 17.0833L1.66669 18.3333L2.91669 13.75L14.1667 2.49999Z"
                            stroke="#667085"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6355_510">
                            <rect width="20" height="20" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M15 18L9 12L15 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              className={
                "arrow " + (fruits.loading || !canGetNextPage ? "disabled" : "")
              }
              onClick={getNextPage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {deleteModalVisible ? (
        <DeleteModal setDeleteModalVisible={setDeleteModalVisible} />
      ) : null}
      {editModalVisible ? (
        <EditModal setEditModalVisible={setEditModalVisible} />
      ) : null}
    </div>
  );
}

export default Table;
