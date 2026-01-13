import "bootstrap/dist/css/bootstrap.min.css";

export function NavBar({ handleUserLogout }: { handleUserLogout: () => void }) {
  return (
    <nav className="navbar navbar-expand-1g navbar-light bg-light p-3">
      <a className="navbar-brand mx-auto" href="#">
        ☀️ Weather App ☀️
      </a>
      <div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={() => handleUserLogout()}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
