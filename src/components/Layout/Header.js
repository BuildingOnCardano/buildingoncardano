import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import SearchInput from 'components/SearchInput';
import React from 'react';
import {
  baseUrl,
  getAllProjects,
} from '../../assets/services';
import {
  MdKeyboardArrowDown,
  MdExitToApp,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink,
  Popover,
  PopoverBody,
  Row,
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import bn from 'utils/bemnames';
import { getUser, getIsLoggedIn, removeUserSession } from 'utils/Common.js';
import styled from 'styled-components';
import logo200Image from 'assets/img/logo/Light-icon200.png';

const bem = bn.create('header');
const width = window.innerWidth;


const MySpan = styled.span`
    color: white;
    cursor: pointer;
    marginleft: 20px;
    &:hover {
        text-decoration: underline;
    }
`;

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    isOpenLinksCardPopover: false,
    user: null,
    projects: null,
    isOpenPages: false,
    smallScreen: false
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  toggleLinksCardPopover = () => {
    this.setState({
      isOpenLinksCardPopover: !this.state.isOpenLinksCardPopover,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  componentDidMount() {
    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    var isLoggedIn = getIsLoggedIn();

    if (isLoggedIn === 'true') {
      var user = getUser();
      this.setState({ user: user });
    }


    if (this.state.projects == null) {
      this.getAllProjects();
    }
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjects);
      const data = await response.json();
      this.setState({ projects: data });
    } catch (error) {
      console.log(error);
    }
  }

  handleClick = name => () => {
    this.setState(prevState => {
      const isOpen = prevState[`isOpen${name}`];

      return {
        [`isOpen${name}`]: !isOpen,
      };
    });
  };

  signout = () => {
    this.setState({ user: null });
    removeUserSession();
  }

  render() {

    return (
      <div style={{ backgroundColor: "#225cb6", }}>

        <Container fluid>
          <Navbar
            className="navbar-top navbar-light"
            expand="md"
            id="navbar-main"
          >
            <Nav navbar>
              <Link to="/">
                <img
                  src={logo200Image}
                  className="rounded"
                  style={{
                    width: 40,
                    height: 40,
                    cursor: 'pointer',
                    alignSelf: 'left',
                  }}
                  alt="logo"
                />
              </Link>
              {this.state.smallScreen ?
                <Nav>
                  <NavLink id="Popover3">
                    <div className="d-flex">
                      <MySpan onClick={this.toggleLinksCardPopover}>Links<MdKeyboardArrowDown /></MySpan>
                    </div>
                  </NavLink>
                  <Popover
                    placement="bottom-end"
                    isOpen={this.state.isOpenLinksCardPopover}
                    toggle={this.toggleLinksCardPopover}
                    target="Popover3"
                    className="p-0 border-0"
                    style={{ minWidth: 250 }}
                  >
                    <PopoverBody className="p-0 border-light">
                      <ListGroup flush>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/">
                            Dashboard
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/allprojects">
                            Projects
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/ecosystem">
                            Ecosystem
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/stats">
                            Stats
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/addproject">
                            Add Project
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/myprojects">
                            My Projects
                          </Link>
                        </ListGroupItem>
                        <ListGroupItem
                          tag="button"
                          action
                          className="border-light"
                        >
                          <Link to="/login">
                            Login
                          </Link>
                        </ListGroupItem>
                      </ListGroup>



                    </PopoverBody>
                  </Popover>
                </Nav>
                :
                <Nav>
                  <NavItem className={bem.e('nav-item')}>
                    <NavLink className={bem.e('nav-item-collapse')}>
                      <Link to="/">
                        <div className="d-flex">
                          <MySpan>Dashboard</MySpan>
                        </div>
                      </Link>
                    </NavLink>
                  </NavItem>

                  <NavItem className={bem.e('nav-item')}>
                    <NavLink className={bem.e('nav-item-collapse')}>
                      <Link to="/allprojects">
                        <div className="d-flex">
                          <MySpan>Projects</MySpan>
                        </div>
                      </Link>
                    </NavLink>
                  </NavItem>

                  <NavItem className={bem.e('nav-item')}>
                    <NavLink className={bem.e('nav-item-collapse')}>
                      <Link to="/ecosystem">
                        <div className="d-flex">
                          <MySpan>Ecosystem</MySpan>
                        </div>
                      </Link>
                    </NavLink>
                  </NavItem>

                  <NavItem className={bem.e('nav-item')}>
                    <NavLink className={bem.e('nav-item-collapse')}>
                      <Link to="/stats">
                        <div className="d-flex">
                          <MySpan>Stats</MySpan>
                        </div>
                      </Link>
                    </NavLink>
                  </NavItem>


                  <NavItem className={bem.e('nav-item')}>
                    <NavLink className={bem.e('nav-item-collapse')}>
                      <Link to="/addproject">
                        <div className="d-flex">
                          <MySpan>Add Project</MySpan>
                        </div>
                      </Link>
                    </NavLink>
                  </NavItem>

                  {this.state.user != null &&
                    <NavItem className={bem.e('nav-item')}>
                      <NavLink className={bem.e('nav-item-collapse')}>
                        <Link to="/myprojects">
                          <div className="d-flex">
                            <MySpan>My Projects</MySpan>
                          </div>
                        </Link>
                      </NavLink>
                    </NavItem>}
                </Nav>
              }

            </Nav>

            <Nav navbar className={bem.e('nav-right')}>

              {this.state.projects != null && (
                <SearchInput projects={this.state.projects} />
              )}

              {this.state.user != null ? (
                <NavItem>
                  <NavLink id="Popover2">
                    <Avatar
                      onClick={this.toggleUserCardPopover}
                      className="can-click"
                      style={{ color: '#fff' }}
                      color='#fff'
                    />
                  </NavLink>
                  <Popover
                    placement="bottom-end"
                    isOpen={this.state.isOpenUserCardPopover}
                    toggle={this.toggleUserCardPopover}
                    target="Popover2"
                    className="p-0 border-0"
                    style={{ minWidth: 250 }}
                  >
                    <PopoverBody className="p-0 border-light">
                      <UserCard
                        // title="Jane"
                        subtitle={this.state.user}
                        // text="Last updated 3 mins ago"
                        className="border-light"
                      >
                        <ListGroup flush>
                          {/* <ListGroupItem tag="button" action className="border-light">
                      <MdPersonPin /> Profile
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdInsertChart /> Stats
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdMessage /> Messages
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdSettingsApplications /> Settings
                    </ListGroupItem>
                    <ListGroupItem tag="button" action className="border-light">
                      <MdHelp /> Help
                    </ListGroupItem> */}
                          <ListGroupItem
                            tag="button"
                            action
                            className="border-light"
                          >
                            <Link to="/signout" onClick={this.signout}>
                              <MdExitToApp />
                              Signout
                            </Link>
                          </ListGroupItem>
                        </ListGroup>
                      </UserCard>
                    </PopoverBody>
                  </Popover>
                </NavItem>
              )
                :
                !this.state.smallScreen &&
                <NavItem className={bem.e('nav-item')}>
                  <NavLink className={bem.e('nav-item-collapse')}>
                    <Link to="/login">
                      <div className="d-flex">
                        <span style={{ color: '#fff', marginLeft: '20px' }}>Login</span>
                      </div>
                    </Link>
                  </NavLink>
                </NavItem>
              }
            </Nav>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default Header;
