import { Container, Nav, Navbar } from "react-bootstrap";
function App() {
  return (
    <div className="vh-100">
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Amazon</Navbar.Brand>
          </Container>
          <Nav>
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/signin" className="nav-link">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3"></Container>
      </main>
      <footer>
        <div className="text-center">All right reserved</div>
      </footer>
    </div>
  );
}

export default App;
