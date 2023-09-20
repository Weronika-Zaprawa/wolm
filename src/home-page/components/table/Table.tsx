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
        <table>
          <tr className="header-row">
            <th>Nazwa</th>
            <th>Odmiana</th>
            <th>Ilość</th>
            <th>Data zbioru</th>
            <th>Stan</th>
            <th></th>
          </tr>
          <tr>
            <td>
              <p>Truskawka</p>Słodka odmiana polecana
            </td>
            <td>Rumba</td>
            <td>20kg</td>
            <td>26/06/2023</td>
            <td>
              <div className="pill">• Normalny</div>
            </td>
            <td>
              <div className="icon-container">
                <div className="icon" onClick={() => handleClickOnBin()}>
                  🗑️
                </div>
                <div className="icon" onClick={() => handleClickOnPencil()}>
                  ✏️
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Truskawka</p>Na przetwory
            </td>
            <td>Miękka</td>
            <td>50kg</td>
            <td>27/06/2023</td>
            <td>
              <div className="pill fresh">• Świeże</div>
            </td>
            <td>
              <div className="icon-container">
                <div className="icon">🗑️</div>
                <div className="icon">✏️</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Czereśnia</p>Dłużo leży
            </td>
            <td>Kwaśna</td>
            <td>5kg</td>
            <td>28/06/2023</td>
            <td>
              <div className="pill fresh">• Świeże</div>
            </td>
            <td>
              <div className="icon-container">
                <div className="icon">🗑️</div>
                <div className="icon">✏️</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Czereśnia</p>Utrzymywać cenę powyżej 10 zł
            </td>
            <td>Słodka</td>
            <td>2kg</td>
            <td>20/06/2023</td>
            <td>
              <div className="pill widhered">• Zwiędłe</div>
            </td>
            <td>
              <div className="icon-container">
                <div className="icon">🗑️</div>
                <div className="icon">✏️</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Jabłko</p>Dobre na kompot
            </td>
            <td>Champion</td>
            <td>50 szt.</td>
            <td>27/06/2023</td>
            <td>
              <div className="pill fresh">• Świeże</div>
            </td>
            <td>
              <div className="icon-container">
                <div className="icon">🗑️</div>
                <div className="icon">✏️</div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <p>Jabłko</p>Wyprzedawać priorytetowo
            </td>
            <td>Papierówka</td>
            <td>300 szt.</td>
            <td>26/06/2023</td>
            <td>
              <div className="pill fresh">• Świeże</div>
            </td>
            <td>
              <div className="icon-container">
                <div className="icon">🗑️</div>
                <div className="icon">✏️</div>
              </div>
            </td>
          </tr>
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
