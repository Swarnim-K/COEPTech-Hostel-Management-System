import './Admin.css'; // Make sure the path is correct

const AdminLogin = () => {
  return (
    <div className="all">
      <div className="login-container admin">
        <h2>Administrator Login</h2>
        <form>
          <div className="form-group">
            <i className="icon-username">👤</i> {/* Placeholder icon */}
            <input type="text" placeholder="Username" required />
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

export default AdminLogin;
