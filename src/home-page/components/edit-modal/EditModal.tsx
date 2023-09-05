import "./EditModal.scss";

function EditModal() {
  const today = new Date();
  console.log(today.toISOString());
  return (
    <div>
      <div className="edit-modal-icon"></div>
      <div className="edit-modal-title">
        <h1>Edycja plonów</h1>
        <p>Zaktualizuj informacje o plonach</p>
      </div>
      <form>
        <div className="row">
          <label htmlFor="name">Nazwa</label>
          <input id="name" type="text" placeholder="Nazwa"></input>
          <label htmlFor="date">Data</label>
          <input
            type="text"
            placeholder="MM/DD/YYYY"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          ></input>
        </div>
        <div className="row">
          <label htmlFor="variety">Odmiana</label>
          <input id="variety" type="text" placeholder="Odmiana"></input>
          <label htmlFor="state">Stan</label>
          <select id="state">
            <option value="" disabled selected>
              Stan
            </option>
            <option value="normal">Normalny</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="category">Kategoria</label>
          <select id="category">
            <option value="" disabled selected>
              Kategoria
            </option>
            <option value="fruits">Owoce</option>
          </select>
          <label htmlFor="amount">Ilość</label>
          <input
            id="amount"
            type="number"
            placeholder="10"
            min="0.1"
            step="0.1"
          ></input>
          <label htmlFor="unit">Jednostka</label>
          <select id="unit">
            <option value="kg" selected>
              kg
            </option>
            <option value="g">g</option>
          </select>
        </div>
        <div className="row">
          <label htmlFor="information">Informacje</label>
          <input
            id="information"
            type="text"
            placeholder="Dodatkowe informacje"
          ></input>
        </div>
        <div className="modal-buttons-wrapper">
          <div className="cancel-button">Anuluj</div>
          <div className="delete-button">Usuń</div>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
