import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import withBadge from 'hocs/withBadge';
import React from 'react';
import {
  baseUrl,
  getAllProjects,
  getProjectsStats,
  liveProjectSales,
} from '../../assets/services';
import {
  MdClearAll,
  MdExitToApp,
  MdHelp,
  MdInsertChart,
  MdMessage,
  MdNotificationsActive,
  MdNotificationsNone,
  MdPersonPin,
  MdSettingsApplications,
  MdPersonPinCircle,
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
  Col,
  Container,
  Collapse,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import bn from 'utils/bemnames';
import { getUser } from 'utils/Common.js';
import { GiBurningSkull } from 'react-icons/gi';
import { BsListOl } from 'react-icons/bs';

import {
  MdAccountCircle,
  MdDashboard,
  MdGroupWork,
  MdStar,
  MdPages,
  MdAddToQueue,
  MdVerifiedUser,
  MdAttachMoney,
  MdKeyboardArrowDown
} from 'react-icons/md';
import logo200Image from 'assets/img/logo/Light-icon200.png';

const projectsContents = [
  { to: '/liveprojects', name: 'alive', exact: true, Icon: MdStar },
  { to: '/deadprojects', name: 'dead', exact: true, Icon: GiBurningSkull },
  { to: '/allprojects', name: 'All', exact: true, Icon: BsListOl },
];

const bem = bn.create('header');
const width = window.innerWidth;

const MdNotificationsActiveWithBadge = withBadge({
  size: 'md',
  color: 'primary',
  style: {
    top: -10,
    right: -10,
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: <small>5</small>,
})(MdNotificationsActive);

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    user: null,
    projects: null,
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
    const { isNotificationConfirmed } = this.state;

    return (
      // 

      <div style={{ backgroundColor: "#225cb6", }}>

        <Container fluid>
          <Navbar
            className="navbar-top navbar-light"
            expand="md"
            id="navbar-main"
          >
            <Nav navbar className="mr-2">
              <Button outline onClick={this.handleSidebarControlButton}>
                <MdClearAll size={20} />
              </Button>
            </Nav>

            <Nav
              navbar
              style={{
                justifyContent: 'Left',
                alignItems: 'Left',
                textAlign: 'Left',
              }}
            >
              <div
                className="App-text"
                style={{
                  justifyContent: 'Left',
                  alignItems: 'Left',
                  textAlign: 'Left',
                }}
              >
                <Link to="/">
                  <Row>

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
                    <h4 className="text-black" style={{ color: '#fff', marginTop: '8px', marginLeft: '5px', marginRight: '20px' }}>
                      Building On Cardano
                    </h4>

                  </Row>
                </Link>
              </div>

              <NavItem
                className={bem.e('nav-item')}
                onClick={this.handleClick('Pages')}
                onTouchStart={this.handleClick('Pages')}            >
                <NavLink className={bem.e('nav-item-collapse')}>
                  <div className="d-flex">
                    {/* <MdPages className={bem.e('nav-item-icon')} /> */}
                    <span style={{ color: '#fff'}}>PROJECTS</span>
                  </div>
                  <MdKeyboardArrowDown
                    className={bem.e('nav-item-icon')}
                    style={{
                      padding: 0,
                      transform: this.state.isOpenPages
                        ? 'rotate(0deg)'
                        : 'rotate(-90deg)',
                      transitionDuration: '0.3s',
                      transitionProperty: 'transform',
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
                      <Icon className={bem.e('nav-item-icon')} style={{ color: '#fff', marginRight: '5px'}} />
                      <span style={{ color: '#fff'}}>{name}</span>
                    </NavLink>
                  </NavItem>
                ))}
              </Collapse>
            </Nav>

            <Nav navbar className={bem.e('nav-right')}>
              {this.state.projects != null && (
                <SearchInput projects={this.state.projects} />
              )}
              {/* {(this.state.user != null) && (<p>Logged in as: {this.state.user}</p>)} */}
              {/* <NavItem className="d-inline-flex">
            <NavLink id="Popover1" className="position-relative">
              {isNotificationConfirmed ? (
                <MdNotificationsNone
                  size={25}
                  className="text-secondary can-click"
                  onClick={this.toggleNotificationPopover}
                />
              ) : (
                <MdNotificationsActiveWithBadge
                  size={25}
                  className="text-secondary can-click animated swing infinite"
                  onClick={this.toggleNotificationPopover}
                />
              )}
            </NavLink>
            <Popover
              placement="bottom"
              isOpen={this.state.isOpenNotificationPopover}
              toggle={this.toggleNotificationPopover}
              target="Popover1"
            >
              <PopoverBody>
                <Notifications notificationsData={notificationsData} />
              </PopoverBody>
            </Popover>
          </NavItem> */}




              {this.state.user != null && (
                <NavItem>
                  <NavLink id="Popover2">
                    <Avatar
                      onClick={this.toggleUserCardPopover}
                      className="can-click"
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
              )}
            </Nav>
          </Navbar>
        </Container>
      </div>
    );
  }
}

export default Header;
