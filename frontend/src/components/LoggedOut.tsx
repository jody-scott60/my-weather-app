import type { UserFormStatus } from "../types/api/backend/index";

import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";

export function LoggedOut({
  handleUserSignup,
  handleUserLogin,
  userFormStatus,
  setUserFormStatus,
  email,
  setEmail,
  password,
  setPassword,
}: {
  handleUserSignup: () => Promise<void>;
  handleUserLogin: () => Promise<void>;
  userFormStatus: UserFormStatus;
  setUserFormStatus: React.Dispatch<React.SetStateAction<UserFormStatus>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <nav className="navbar navbar-expand-1g navbar-light bg-light p-3">
        <a className="navbar-brand mx-auto" href="#">
          ☀️ Weather App ☀️
        </a>
      </nav>
      <div className="logged-out-div">
        <div className="toggle-buttons">
          <button
            className={userFormStatus === "signup" ? "active" : ""}
            onClick={() => setUserFormStatus("signup")}
          >
            Signup
          </button>
          <button
            className={userFormStatus === "login" ? "active" : ""}
            onClick={() => setUserFormStatus("login")}
          >
            Login
          </button>
        </div>
        {userFormStatus === "signup" ? (
          <SignupForm
            handleUserSignup={handleUserSignup}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          ></SignupForm>
        ) : (
          <LoginForm
            handleUserLogin={handleUserLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
          ></LoginForm>
        )}
      </div>
    </div>
  );
}
