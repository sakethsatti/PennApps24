import { Container } from "postcss";
import { Button, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function NavbarHomeScreen(boldquery: any) {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Navbar.Brand href="/" className="font-bold ml-2">
          <img src="/audioLogo.png" className="w-[20px] inline "></img>
          &nbsp; &nbsp; WhisperWave™
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/media-processing" className="md:text-center">
              <span className={boldquery[0]}> Sound Identification</span>
            </Nav.Link>
            <Nav.Link href="/story-creation" className="md:text-center">
              <span className={boldquery[1]}>Story Telling Mode</span>
            </Nav.Link>
            <Nav.Link href="/notetaking" className="md:text-center">
              <span className={boldquery[2]}>Note Taker</span>
            </Nav.Link>
            {/* <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
          <Nav>
            <Button
              href="#deets"
              variant="danger"
              className="md:w-[75%] ml-auto mr-auto"
              onClick={() => {
                localStorage.clear();
                location.reload();
                window.location.href = "http://localhost:3000";
              }}
            >
              Sign Out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
