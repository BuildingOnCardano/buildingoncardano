import sidebarBgImage from 'assets/img/sidebar/rsz_1sidebar-4.jpg';
import React from 'react';
import {
  MdAccountCircle,
  MdArrowDropDownCircle,
  MdBrush,
  MdChromeReaderMode,
  MdDashboard,
  MdGroupWork,
  MdKeyboardArrowDown,
  MdNotificationsActive,
  MdPages,
  MdRadioButtonChecked,
  MdStar,
  MdViewDay,
  MdViewList,
  MdKeyboardArrowRight,
  MdAddToQueue,
  MdVerifiedUser

} from 'react-icons/md';
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
import logo200Image from 'assets/img/logo/logo_200.png';

const sidebarBackground = {
  backgroundImage: `url("${sidebarBgImage}")`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const pageContents = [
  { to: '/defi', name: 'Defi', exact: true, Icon: MdKeyboardArrowRight },
  { to: '/application', name: 'Application', exact: true, Icon: MdKeyboardArrowRight },
  { to: '/tooling', name: 'tooling', exact: true, Icon: MdKeyboardArrowRight },
  { to: '/wallet', name: 'Wallet', exact: true, Icon: MdKeyboardArrowRight },
  { to: '/data', name: 'Data', exact: true, Icon: MdKeyboardArrowRight },
  { to: '/nft', name: 'Nft', exact: true, Icon: MdKeyboardArrowRight },
  { to: '/dex', name: 'Dex', exact: true, Icon: MdKeyboardArrowRight },
];

const navItemsBottom = [
  { to: '/login', name: 'login / signup', exact: false, Icon: MdAccountCircle },
];

const bem = bn.create('sidebar');

class Sidebar extends React.Component {
  state = {
    isOpenComponents: true,
    isOpenContents: true,
    isOpenPages: true,
    navItemsTop: []
  };

  componentDidMount() {
    var user = getUser();
    if (user != null) {
      this.setState({
        navItemsTop: [
          { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard },
          { to: '/myprojects', name: 'my projects', exact: true, Icon: MdVerifiedUser },
          { to: '/addproject', name: 'add project', exact: true, Icon: MdAddToQueue },

        ]
      })

    } else {
      this.setState({
        navItemsTop: [
          { to: '/', name: 'dashboard', exact: true, Icon: MdDashboard }
        ]
      })
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
        <div className={bem.e('background')} style={sidebarBackground} />
        <div className={bem.e('content')}>

          <Navbar>
            <Row className="justify-content-md-center">
              <Col xs={12} sm={4} md={4}>
                <img
                  src={logo200Image}
                  className="rounded"
                  style={{ width: 120, height: 120, cursor: 'pointer', alignSelf: 'center' }}
                  alt="logo"
                />
              </Col>
            </Row>

            <h5 className="text-white">Building On Cardano</h5>
          </Navbar>
          <Nav vertical>
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
              {pageContents.map(({ to, name, exact, Icon }, index) => (
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

            {navItemsBottom.map(({ to, name, exact, Icon }, index) => (
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

          </Nav>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
