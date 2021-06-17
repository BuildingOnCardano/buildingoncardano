import Avatar from 'components/Avatar';
import { UserCard } from 'components/Card';
import Notifications from 'components/Notifications';
import SearchInput from 'components/SearchInput';
import withBadge from 'hocs/withBadge';
import React from 'react';
import { baseUrl, getLatestProjects, getProjectsStats, liveProjectSales } from '../../assets/services';
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
  MdPersonPinCircle
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
  Col
} from 'reactstrap';
import { Link } from 'react-router-dom';
import bn from 'utils/bemnames';
import { getUser } from 'utils/Common.js';

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
    projects: null
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
      var response = await fetch(baseUrl + getLatestProjects);
      const data = await response.json();
      this.setState({ projects: data })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const { isNotificationConfirmed } = this.state;

    return (
      // <Navbar light expand className={bem.b('bg-white')}>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={20} />
          </Button>
        </Nav>

        <Nav navbar className="mr-2">

        </Nav>


        <Nav navbar className={bem.e('nav-right')}>
        {this.state.projects != null &&
            <SearchInput projects={this.state.projects} />
          }
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

          {this.state.user != null && <NavItem>
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
                    <ListGroupItem tag="button" action className="border-light">
                      <Link to={{ pathname: '/signout' }}>
                        <MdExitToApp />
                        Signout
                      </Link>
                    </ListGroupItem>
                  </ListGroup>
                </UserCard>
              </PopoverBody>
            </Popover>
          </NavItem>}
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
