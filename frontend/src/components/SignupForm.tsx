export function SignupForm({
  handleUserSignup,
  email,
  setEmail,
  password,
  setPassword,
}: {
  handleUserSignup: () => Promise<void>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div>
      <h1>☀️ Sign up ☀️</h1>
      <div className="input-elements">
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={() => handleUserSignup()}>Submit</button>
      </div>
    </div>
  );
}
