import React from 'react';
import shamrock from 'assets/img/paddy.jpg';
import paul from 'assets/img/paul.jpg';
import { Link } from 'react-router-dom';

import { Navbar, Nav, NavItem, Row } from 'reactstrap';
const Footer = () => {
  return (
    <Navbar>
      <Nav navbar>
        <NavItem>
          <Row>
            Building On Cardano - a place to view whats happening within the
            cardano ecosystem.
          </Row>
          <Row>
            <p>
              Brought to you by Stake Pool Operators{' '}
              <b>Paddy - Shamrock Pool</b> and <b>Cardano With Paul</b>
            </p>
          </Row>
          <Row>
            <a href="https://shamrock-pool.com/" target="_blank">
              <img
                src={shamrock}
                className="rounded"
                style={{ width: '7vh', height: '7vh', cursor: 'pointer' }}
              />
            </a>
            <a href="https://www.cardanowithpaul.com/" target="_blank">
              <img
                src={paul}
                className="rounded"
                style={{ width: '7vh', height: '7vh', cursor: 'pointer' }}
              />
            </a>
          </Row>
          <Link to="/termsandpolicy">Terms and policy</Link>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Footer;
