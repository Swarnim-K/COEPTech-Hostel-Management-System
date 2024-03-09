import './Admin.css'; // Using the same CSS file for styling

const GuestLogin = () => {
  return (
    <div className="all">
      <div className="login-container guest">
        <h2>Guest Login</h2>
        <form>
          <div className="form-group">
            <i className="icon-email">📧</i> {/* Placeholder icon */}
            <input type="email" placeholder="Email" required />
          </div>
          <div className="form-group">
            <i className="icon-password">🔒</i> {/* Placeholder icon */}
            <input type="password" placeholder="Password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default GuestLogin;
