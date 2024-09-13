import { FormEvent, useEffect } from "react";
import { useLogin } from "./hooks/useLogin";
import { selectAuthError, selectAuthIsLogged, useAuth } from "@/services/auth";
import { ServerError } from "@/shared/components/core/ServerError";
import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const { formData, isValid, changeHandler } = useLogin();

  const navigate = useNavigate();
  const error = useAuth(selectAuthError);
  const login = useAuth((state) => state.login);
  const isLogged = useAuth(selectAuthIsLogged);

  useEffect(() => {
    if (isLogged) {
      navigate("/cms");
    }
  }, [isLogged]);

  function doLogin(e: FormEvent) {
    e.preventDefault();
    console.log(formData);
    login(formData.username, formData.password);
  }

  return (
    <div className="page-sm">
      <h1 className="title">LOGIN</h1>

      {error && <ServerError />}

      <form className="flex flex-col gap-4" onSubmit={doLogin}>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <button
          disabled={!isValid}
          className={`btn ${isValid ? "success" : "danger"}`}
          type="submit"
        >
          SIGN IN
        </button>
      </form>
    </div>
  );
}
