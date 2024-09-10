"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HelpIcon from "@mui/icons-material/Help";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSession, signIn, signOut } from "next-auth/react";
function Menu() {
  const { data: session } = useSession();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Books Universe</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/">
              <HomeIcon />
              Home
            </Nav.Link>
            {session ? (
              <Nav.Link onClick={() => signOut()}>
                <LogoutIcon />
                Se déconnecter
              </Nav.Link>
            ) : (
              <Nav.Link onClick={() => signIn()}>
                <AccountCircleIcon />
                Se connecter
              </Nav.Link>
            )}
            {/* <Nav.Link as={Link} href="/">
              <AccountCircleIcon />
              Se connecter
            </Nav.Link> */}
            <Nav.Link as={Link} href="/">
              <HelpIcon />
              Aide
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
export default Menu;
