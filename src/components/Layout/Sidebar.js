import sidebarBgImage from 'assets/img/sidebar/rsz_1sidebar-4.jpg';
import React from 'react';
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
import { GiBurningSkull } from 'react-icons/gi';
import { BsListOl } from 'react-icons/bs';

import { NavLink } from 'react-router-dom';
import {
  Row,
  Col,
  Collapse,
  Nav,
  Navbar,
  NavItem,
  NavLink as BSNavLink,
} from 'reactstrap';
import bn from 'utils/bemnames';
import { getUser } from 'utils/Common.js';
import logo200Image from 'assets/img/logo/Light-icon200.png';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const projectsContents = [
  { to: '/liveprojects', name: 'alive', exact: true, Icon: MdStar },
  { to: '/deadprojects', name: 'dead', exact: true, Icon: GiBurningSkull },
  { to: '/allprojects', name: 'All', exact: true, Icon: BsListOl },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    navItemsTop: [],
    loggedin: false,
    navItemsBottom: [],
    navItemsMiddle: []
  };

  componentDidMount() {
    var user = getUser();
    if (user != null) {
      this.setState({
        navItemsTop: [
          { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard }
        ],
        navItemsMiddle: [
          {
            to: '/ecosystem',
            name: 'Ecosystem',
            exact: true,
            Icon: MdGroupWork,
          },
          {
            to: '/myprojects',
            name: 'my projects',
            exact: true,
            Icon: MdVerifiedUser,
          },
          {
            to: '/addproject',
            name: 'add project',
            exact: true,
            Icon: MdAddToQueue,
          },
        ],
        loggedin: true,
        navItemsBottom: [
          {
            to: '/signout',
            name: 'signout',
            exact: false,
            Icon: MdAccountCircle,
          },
        ],
      });
    } else {
      this.setState({
        navItemsTop: [
          { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard }
        ],
        navItemsMiddle: [
          {
            to: '/ecosystem',
            name: 'Ecosystem',
            exact: true,
            Icon: MdGroupWork,
          },
          {
            to: '/addproject',
            name: 'add project',
            exact: true,
            Icon: MdAddToQueue,
          },
        ],
        navItemsBottom: [
          {
            to: '/login',
            name: 'login / signup',
            exact: false,
            Icon: MdAccountCircle,
          },
        ],
      });
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
      <aside className={bem.b()} data-image={sidebarBgImage}>
        {/* <div className={bem.e('background')} style={sidebarBackground} /> */}
        <div className={bem.e('content')}>
          <Navbar>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={4} md={4}>
                <Link to="/">
                  <img
                    src={logo200Image}
                    className="rounded"
                    style={{
                      width: 120,
                      height: 120,
                      cursor: 'pointer',
                      alignSelf: 'center',
                    }}
                    alt="logo"
                  />
                </Link>
              </Col>
            </Row>
          </Navbar>
          <Nav
            vertical
            style={{
              color: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >

            {this.state.navItemsTop.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}


            <NavItem
              className={bem.e('nav-item')}
              onClick={this.handleClick('Pages')}
            >
              <BSNavLink className={bem.e('nav-item-collapse')}>
                <div className="d-flex">
                  <MdPages className={bem.e('nav-item-icon')} />
                  <span className="">PROJECTS</span>
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
              </BSNavLink>
            </NavItem>
            <Collapse isOpen={this.state.isOpenPages}>
              {projectsContents.map(({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ))}
            </Collapse>

            {this.state.navItemsMiddle.map(({ to, name, exact, Icon }, index) => (
              <NavItem key={index} className={bem.e('nav-item')}>
                <BSNavLink
                  id={`navItem-${name}-${index}`}
                  className="text-uppercase"
                  tag={NavLink}
                  to={to}
                  activeClassName="active"
                  exact={exact}
                >
                  <Icon className={bem.e('nav-item-icon')} />
                  <span className="">{name}</span>
                </BSNavLink>
              </NavItem>
            ))}

            {this.state.navItemsBottom.map(
              ({ to, name, exact, Icon }, index) => (
                <NavItem key={index} className={bem.e('nav-item')}>
                  <BSNavLink
                    id={`navItem-${name}-${index}`}
                    className="text-uppercase"
                    tag={NavLink}
                    to={to}
                    activeClassName="active"
                    exact={exact}
                  >
                    <Icon className={bem.e('nav-item-icon')} />
                    <span className="">{name}</span>
                  </BSNavLink>
                </NavItem>
              ),
            )}
          </Nav>

          <Row className="justify-content-md-center">
            <Col xs={12} sm={4} md={4}>
              <br></br>
              <a
                href="https://twitter.com/BuildingCardano"
                target="_blank"
                rel="noreferrer"
              >
                <Row
                  icon={faTwitter}
                  style={{
                    color: 'white',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <FontAwesomeIcon
                    size="2x"
                    icon={faTwitter}
                    style={{ color: 'white' }}
                  />
                  <p style={{ color: '#FFFFFF' }}>Follow Us</p>
                </Row>
              </a>
            </Col>
          </Row>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
