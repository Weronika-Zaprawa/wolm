import { RefObject } from "react";
import { useState } from "react";
import "./HarvestForm.scss";

function HarvestForm() {
  const [name, setName] = useState<string>("");
  return (
    <form>
      <div className="row">
        <div className="cell large">
          <label htmlFor="name">Nazwa</label>
          <input id="name" type="text" placeholder="Nazwa"></input>
        </div>
        <div className="cell small">
          <label htmlFor="date">Data</label>
          <input
            type="text"
            placeholder="MM/DD/YYYY"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          ></input>
        </div>
      </div>
      <div className="row">
        <div className="cell large">
          <label htmlFor="variety">Odmiana</label>
          <input id="variety" type="text" placeholder="Odmiana"></input>
        </div>
        <div className="cell small">
          <label htmlFor="state">Stan</label>
          <select id="state">
            <option value="" disabled selected>
              Stan
            </option>
            <option value="normal">Normalny</option>
          </select>
        </div>
      </div>
      <div className="row medium">
        <div className="cell medium">
          <label htmlFor="category">Kategoria</label>
          <select id="category">
            <option value="" disabled selected>
              Kategoria
            </option>
            <option value="fruits">Owoce</option>
          </select>
        </div>
        <div className="cell small">
          <label htmlFor="amount">Ilość</label>
          <input
            id="amount"
            type="number"
            placeholder="10"
            min="0.1"
            step="0.1"
          ></input>
        </div>
        <div className="cell extra-small">
          <label htmlFor="unit">Jednostka</label>
          <select id="unit">
            <option value="kg" selected>
              kg
            </option>
            <option value="g">g</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="cell extra-large">
          <label htmlFor="information">Informacje</label>
          <input
            id="information"
            type="text"
            placeholder="Dodatkowe informacje"
          ></input>
        </div>
      </div>
    </form>
  );
}

export default HarvestForm;
