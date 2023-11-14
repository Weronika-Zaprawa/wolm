import { RefObject } from "react";
import { useState } from "react";
import "./HarvestForm.scss";
import { useHarvest } from "../../services/HarvestContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

type HarvestFormValues = {
  name: string;
  harvest_date: string;
  variety: string;
  freshness: string;
  category: string;
  amount: string;
  amount_unit: string;
  additional_information: string;
};

type HarvestFormProps = {
  onSubmit: (values: HarvestFormValues) => void;
  formRef: RefObject<HTMLFormElement>;
};

function HarvestForm({ formRef, onSubmit }: HarvestFormProps) {
  const { dictionary } = useHarvest();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Nazwa jest wymagana")
      .matches(/[^\s*].*[^\s*]/g, "To pole nie może zawierać samych spacji"),
    harvest_date: Yup.string().required("Data jest wymagana"),
    variety: Yup.string()
      .required("Odmiana jest wymagana")
      .matches(/[^\s*].*[^\s*]/g, "To pole nie może zawierać samych spacji"),
    freshness: Yup.string().required("Stan jest wymagany"),
    category: Yup.string().required("Kategoria jest wymagana"),
    amount: Yup.string().required("Ilość jest wymagana"),
    amount_unit: Yup.string().required("Jednostka jest wymagana"),
    additional_information: Yup.string()
      .required("Dodatkowe informacje są wymagana")
      .min(5, "Dodatkowe informacje muszą mieć przynajmniej 5 znaków")
      .matches(/[^\s*].*[^\s*]/g, "To pole nie może zawierać samych spacji"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HarvestFormValues>({
    resolver: yupResolver(validationSchema),
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="cell large">
          <label htmlFor="name">Nazwa</label>
          <input
            id="name"
            type="text"
            placeholder="Nazwa"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          ></input>
          <div className="invalid-feedback">{errors.name?.message}</div>
        </div>
        <div className="cell small">
          <label htmlFor="harvest_date">Data</label>
          <input
            type="text"
            placeholder="MM/DD/YYYY"
            {...register("harvest_date")}
            className={`form-control ${
              errors.harvest_date ? "is-invalid" : ""
            }`}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
          ></input>
          <div className="invalid-feedback">{errors.harvest_date?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="cell large">
          <label htmlFor="variety">Odmiana</label>
          <input
            id="variety"
            type="text"
            placeholder="Odmiana"
            {...register("variety")}
            className={`form-control ${errors.variety ? "is-invalid" : ""}`}
          ></input>
          <div className="invalid-feedback">{errors.variety?.message}</div>
        </div>
        <div className="cell small">
          <label htmlFor="freshness">Stan</label>
          <select
            id="freshness"
            {...register("freshness")}
            className={`form-control ${errors.freshness ? "is-invalid" : ""}`}
          >
            <option value="" disabled selected>
              Stan
            </option>
            {dictionary.freshnesses.map((fresh) => {
              return <option value={fresh.key}>{fresh.name}</option>;
            })}
          </select>
          <div className="invalid-feedback">{errors.freshness?.message}</div>
        </div>
      </div>
      <div className="row medium">
        <div className="cell medium">
          <label htmlFor="category">Kategoria</label>
          <select
            id="category"
            {...register("category")}
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
          >
            <option value="" disabled selected>
              Kategoria
            </option>
            {dictionary.categories.map((category) => {
              return <option value={category.key}>{category.name}</option>;
            })}
          </select>
          <div className="invalid-feedback">{errors.category?.message}</div>
        </div>
        <div className="cell extra-small">
          <label htmlFor="amount">Ilość</label>
          <input
            id="amount"
            type="number"
            placeholder="10"
            min="0.1"
            step="0.1"
            {...register("amount")}
            className={`form-control ${errors.amount ? "is-invalid" : ""}`}
          ></input>
          <div className="invalid-feedback">{errors.amount?.message}</div>
        </div>
        <div className="cell small">
          <label htmlFor="amount_unit">Jednostka</label>
          <select
            id="amount_unit"
            {...register("amount_unit")}
            className={`form-control ${errors.amount_unit ? "is-invalid" : ""}`}
          >
            <option value="" disabled selected>
              Jednostka
            </option>
            {dictionary.weight_units.map((unit) => {
              return <option value={unit.key}>{unit.name}</option>;
            })}
          </select>
          <div className="invalid-feedback">{errors.amount_unit?.message}</div>
        </div>
      </div>
      <div className="row">
        <div className="cell extra-large">
          <label htmlFor="additional_information">Informacje</label>
          <input
            id="additional_information"
            type="text"
            placeholder="Dodatkowe informacje"
            {...register("additional_information")}
            className={`form-control ${
              errors.additional_information ? "is-invalid" : ""
            }`}
          ></input>
          <div className="invalid-feedback">
            {errors.additional_information?.message}
          </div>
        </div>
      </div>
    </form>
  );
}

export default HarvestForm;
