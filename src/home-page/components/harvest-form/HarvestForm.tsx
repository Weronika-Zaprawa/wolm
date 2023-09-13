import { FormEvent, RefObject } from "react";
import { useState } from "react";
import "./HarvestForm.scss";

type HarvestFormValues = {
  name: string;
  date: string;
  variety: string;
  state: string;
  category: string;
  amount: string;
  unit: string;
  information: string;
};

type HarvestFormProps = {
  onSubmit: (values: HarvestFormValues) => void;
  formRef: RefObject<HTMLFormElement>;
};

function HarvestForm({ onSubmit, formRef }: HarvestFormProps) {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [variety, setVariety] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [information, setInformation] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      date,
      variety,
      state,
      category,
      amount,
      unit,
      information,
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <div className="row">
        <div className="cell large">
          <label htmlFor="name">Nazwa</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            type="text"
            placeholder="Nazwa"
          ></input>
        </div>
        <div className="cell small">
          <label htmlFor="date">Data</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
          <input
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            id="variety"
            type="text"
            placeholder="Odmiana"
          ></input>
        </div>
        <div className="cell small">
          <label htmlFor="state">Stan</label>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            id="state"
          >
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
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="category"
          >
            <option value="" disabled selected>
              Kategoria
            </option>
            <option value="fruits">Owoce</option>
          </select>
        </div>
        <div className="cell small">
          <label htmlFor="amount">Ilość</label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            id="amount"
            type="number"
            placeholder="10"
            min="0.1"
            step="0.1"
          ></input>
        </div>
        <div className="cell extra-small">
          <label htmlFor="unit">Jednostka</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            id="unit"
          >
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
            value={information}
            onChange={(e) => setInformation(e.target.value)}
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
