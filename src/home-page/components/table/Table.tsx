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
            Truskawka <p>Słodka odmiana polecana</p>
          </td>
          <td>Rumba</td>
          <td>20kg</td>
          <td>26/06/2023</td>
          <td>Normalny</td>
          <td>🗑️✏️</td>
        </tr>
      </table>
    </div>
  );
}

export default Table;
