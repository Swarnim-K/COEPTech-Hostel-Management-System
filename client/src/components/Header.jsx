import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const { userInfo } = useSelector(state => state.auth);

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar expand="lg" collapseOnSelect className="main-header">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>COEP Hostel Management System</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <LinkContainer to="/allotment">
                      <NavDropdown.Item>Allotment</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/guest">
                      <NavDropdown.Item>Guest Allocation</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
