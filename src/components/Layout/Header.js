import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import SearchInput from 'components/SearchInput';
import React from 'react';
import {
  baseUrl,
  getAllProjects,
} from '../../assets/services';
import {
  MdClearAll,
  MdExitToApp,
} from 'react-icons/md';
import {
  Button,
  ListGroup,
  ListGroupItem,
  // NavbarToggler,
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
import { getUser } from 'utils/Common.js';
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
    user: null,
    projects: null,
    isOpenPages: false,
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

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  componentDidMount() {
    var user = getUser();
    this.setState({ user: user });
    this.getAllProjects();
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

              {/* <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('Pages')}
                onTouchStart={this.handleClick('Pages')}            >
                <NavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    <span style={{ color: '#fff', marginLeft: '20px' }}>Projects</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenPages
                        ? 'rotate(-90deg)'
                        : 'rotate(-0deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
                      color: '#fff'
                    }}
                  />
                </NavLink>
              </NavItem>
              <Collapse isOpen={this.state.isOpenPages}>
                {projectsContents.map(({ to, name, exact, Icon }, index) => (
                  <NavItem key={index} className={bem.e('nav-item')}>
                    <NavLink
                      id={`navItem-${name}-${index}`}
                      className="text-uppercase"
                      tag={NavLink}
                      to={to}
                      activeClassName="active"
                      exact={exact}
                    >
                      <Icon className={bem.e('nav-item-icon')} style={{ color: '#fff', marginRight: '5px' }} />
                      <span style={{ color: '#fff' }}>{name}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </Collapse> */}

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
                            <Link to="/signout">
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
                <NavItem className={bem.e('nav-item')}>
                  <NavLink className={bem.e('nav-item-collapse')}>
                    <Link to="/login">
                      <div className="d-flex">
                        <span style={{ color: '#fff', marginLeft: '20px' }}>LOGIN / SIGNUP</span>
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
