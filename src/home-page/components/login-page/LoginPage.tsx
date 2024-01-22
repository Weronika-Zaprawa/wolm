import "./LoginPage.scss";
import { PersonIcon } from "../../../images/icons";
import { LockIcon } from "../../../images/icons";
import { EyeIcon } from "../../../images/icons";
import { EyeSlashIcon } from "../../../images/icons";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../../services/AuthContext";

type LoginFormValues = {
  email: string;
  password: string;
};

type LoginResponse = {
  access_token: string;
};

function LoginPage() {
  const { saveToken } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Błędy format email")
      .required("Email jest wymagany!"),
    password: Yup.string().required("Hasło jest wymagane!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver: yupResolver(validationSchema) });

  async function login(values: LoginFormValues) {
    values.email = values.email.trim();
    const response = await fetch(`https://wolm.onrender.com/login`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      alert("Podano błędny email lub hasło");
    } else {
      const token: LoginResponse = await response.json();
      saveToken(token.access_token);
    }
  }

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="login-page-wrapper">
      <div className="login-modal">
        <div className="header">Zaloguj się</div>
        <form onSubmit={handleSubmit(login)} className="login-form">
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
          <button className="button">
            <span>ZALOGUJ SIĘ</span>
          </button>
          <button className="register-button">Utwórz nowe konto </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
