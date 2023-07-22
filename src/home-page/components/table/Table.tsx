import "./Table.scss";

function Table() {
  return (
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
              <div className="icon">🗑️</div>
              <div className="icon">✏️</div>
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
        <div className="page-number">Strona 1 z 10</div>
        <div className="page-changer">
          <div className="arrow">⬅️</div>
          <div className="arrow">➡️</div>
        </div>
      </div>
    </div>
  );
}

export default Table;
