import "./AuthPage.scss";
import { PersonIcon } from "../images/icons";
import { LockIcon } from "../images/icons";
import { EyeIcon } from "../images/icons";
import { EyeSlashIcon } from "../images/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../home-page/services/AuthContext";
import { AUTH_ROUTE_PATHS } from "./AuthRoutes";
import { useNavigate } from "react-router-dom";

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Błędy format email")
      .required("Email jest wymagany!"),
    password: Yup.string()
      .required("Hasło jest wymagane!")
      .min(6, "Hasło musi zawierać przynajmniej 6 znaków!"),
    confirmPassword: Yup.string()
      .required("Powtórz hasło!")
      .oneOf([Yup.ref("password")], "Podane hasła muszą być takie same"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({ resolver: yupResolver(validationSchema) });

  async function userRegister(values: RegisterFormValues) {
    setLoading(true);
    values.email = values.email.trim();
    const response = await fetch(`https://wolm.onrender.com/register`, {
      method: "POST",
      body: JSON.stringify({ email: values.email, password: values.password }),
      headers: { "Content-Type": "application/json" },
    });
    setLoading(false);

    if (!response.ok) {
      alert("Konto z podanym adresem e-mail już istnieje");
    } else {
      navigate(AUTH_ROUTE_PATHS.LOGIN);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="page-wrapper">
      <div className="modal">
        <div className="header">Stwórz nowe konto</div>
        <form onSubmit={handleSubmit(userRegister)} className="form">
          <div className="row">
            <label htmlFor="email">Email</label>
            <div className="input-username-container">
              <PersonIcon />
              <input
                id="email"
                type="text"
                placeholder="Wprowadź email"
                {...register("email", { setValueAs: (v) => v.trim() })}
                className={"input-username"}
              ></input>
            </div>
            <div className="error-message">{errors.email?.message}</div>
          </div>
          <div className="row">
            <label htmlFor="password">Hasło</label>
            <div className="input-password-container">
              <LockIcon />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Wprowadź hasło"
                {...register("password")}
                className="input-password"
              ></input>
              <div
                className={
                  "display-password" + (showPassword ? "disabled" : "")
                }
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </div>
              <div
                className={
                  "display-password" + (!showPassword ? "disabled" : "")
                }
                onClick={() => {
                  setShowPassword(false);
                }}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </div>
            </div>
            <div className="error-message">{errors.password?.message}</div>
          </div>
          <div className="row">
            <label htmlFor="confirmPassword">Powtórz hasło</label>
            <div className="input-password-container">
              <LockIcon />
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Wprowadź ponownie hasło"
                {...register("confirmPassword")}
                className="input-password"
              ></input>
              <div
                className={
                  "display-password" + (showPassword ? "disabled" : "")
                }
                onClick={() => {
                  setShowPassword(true);
                }}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </div>
              <div
                className={
                  "display-password" + (!showPassword ? "disabled" : "")
                }
                onClick={() => {
                  setShowPassword(false);
                }}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </div>
            </div>
            <div className="error-message">
              {errors.confirmPassword?.message}
            </div>
          </div>
          <button className={"button " + (loading ? "disabled" : "")}>
            <div className={"spinner " + (loading ? "active" : "")} />
            STWÓRZ KONTO
          </button>
          <button
            className="register-button"
            onClick={() => {
              navigate(AUTH_ROUTE_PATHS.LOGIN);
            }}
          >
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
