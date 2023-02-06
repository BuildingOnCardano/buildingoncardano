import Page from 'components/Page';
import React from 'react';
import { Col, Card, CardHeader, CardBody, Row } from 'reactstrap';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { baseUrl, getAllProjects, getProjectsStats } from '../assets/services';
import '../styles/styles.css';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import SearchBar from '@mkyy/mui-search-bar';
import { DataGrid } from '@mui/x-data-grid';
import { makeStyles } from '@mui/styles';
import CircularImage from 'utils/CircularImage';
import { useParams, Navigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

/* This is a higher order component that
 *  inject a special prop   to our component.
 */
function withRouter(Component) {
  function ComponentWithRouter(props) {
    let params = useParams();
    return <Component {...props} params={params} />;
  }
  return ComponentWithRouter;
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const width = window.innerWidth;

const useStyles = makeStyles({
  root: {
    '& .super-app-theme--header': {
      backgroundColor: 'rgba(255, 7, 0, 0.55)',
    },
  },
});

const columns = [
  {
    field: 'icon',
    renderHeader: params => <h2>{'Icon'}</h2>,
    flexGrow: 1.0,
    renderCell: params => (
      // <img
      //   src={params.value}
      //   className="rounded"
      //   style={{ width: "8vh", height: "8vh", marginRight: "10px" }}
      // />
      <CircularImage imageUrl={params.value} height={'6vh'} width={'6vh'} />
    ),
    headerClassName: 'super-app-theme--header',
    sortable: false,
  },
  {
    field: 'project',
    flex: 1,
    renderHeader: params => <h2>{'Project'}</h2>,
  },
  {
    field: 'type',
    flex: 1,
    renderHeader: params => <h2>{'Type'}</h2>,
  },
  // {
  //   field: 'tokentype',
  //   flex: 1,
  //   renderHeader: params => <h2>{'Token Type'}</h2>,
  // },
  // {
  //   field: 'ticker',
  //   flex: 1,
  //   renderHeader: params => <h2>{'Ticker'}</h2>,
  // },
  {
    field: 'stage',
    flex: 1,
    renderHeader: params => <h2>{'Status'}</h2>,
  },
];

const columnsMobile = [
  {
    field: 'icon',
    renderHeader: params => <h2>{'Icon'}</h2>,
    flexGrow: 1.0,
    renderCell: params => (
      // <img
      //   src={params.value}
      //   className="rounded"
      //   style={{ width: "8vh", height: "8vh", marginRight: "10px" }}
      // />
      <CircularImage imageUrl={params.value} height={'4vh'} width={'4vh'} />
    ),
    headerClassName: 'super-app-theme--header',
    sortable: false,
  },
  {
    field: 'project',
    flex: 1,
    renderHeader: params => <h2>{'Project'}</h2>,
  },
  {
    field: 'type',
    flex: 1,
    renderHeader: params => <h2>{'Type'}</h2>,
  },
];

const tagOptions = [
  { name: 'Application', id: 1 },
  { name: 'Catalyst', id: 2 },
  { name: 'Charity', id: 3 },
  { name: 'Cloud Storage', id: 4 },
  { name: 'Cross-Chain', id: 5 },
  { name: 'Data', id: 6 },
  { name: 'Dao', id: 29 },
  { name: 'Defi', id: 7 },
  { name: 'Dex', id: 8 },
  { name: 'Forex', id: 9 },
  { name: 'Gambling', id: 10 },
  { name: 'Gaming', id: 11 },
  { name: 'Identity', id: 12 },
  { name: 'Infrastructure', id: 13 },
  { name: 'Launch Pad', id: 14 },
  { name: 'Lending', id: 15 },
  { name: 'Meme Coin', id: 16 },
  { name: 'Metaverse', id: 17 },
  { name: 'NFT', id: 18 },
  { name: 'NFT Lending', id: 19 },
  { name: 'NFT Marketplace', id: 20 },
  { name: 'NFT Platform', id: 21 },
  { name: 'Oracle', id: 22 },
  { name: 'Payment', id: 23 },
  { name: 'Stablecoin', id: 24 },
  { name: 'Subscriptions', id: 25 },
  { name: 'Telcom', id: 26 },
  { name: 'Tooling', id: 27 },
  { name: 'Wallet', id: 28 },
];

class AllProjects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      loading: true,
      totalProjects: '',
      projectTypesAndCount: [],
      smallScreen: false,
      searched: '',
      filterAbleProjects: null,
      barChartData: null,
      redirect: false,
      redirectProject: null,
      livestatus: true,
      testnetstatus: true,
      indevelopmentstatus: true,
      ruggedstatus: false,
      failedstatus: false
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);

    //handle signout
    if (!isEmpty(this.props.signout) && this.props.signout == 'true') {
      removeUserSession();
      this.props.signout = false;
    }

    if (width < 600) {
      this.setState({ smallScreen: true });
    }

    if (!this.state.projects) {
      await this.getAllProjects();
    }

    if (this.state.projects) {
      this.filterStatusChange();
    }
  }

  async getAllProjects() {
    try {
      var response = await fetch(baseUrl + getAllProjects);
      const data = await response.json();
      this.createRows(data);
    } catch (error) {
      console.log(error);
    }
  }

  requestSearch(searchedVal) {
    this.setState({ searched: searchedVal });
    if (isEmpty(searchedVal)) {
      this.cancelSearch();
    } else {
      const filteredRows = this.state.filterAbleProjects.filter(row => {
        return row.project.toLowerCase().includes(searchedVal.toLowerCase());
      });
      this.setState({ filterAbleProjects: filteredRows });
    }
  }

  filterStatusChange = (name) => {

    this.cancelSearch();
    let Rows = [];

    if (name === 'Live') {
      this.setState({ livestatus: !this.state.livestatus });
      this.state.livestatus = !this.state.livestatus;
    } else if (name === 'Testnet') {
      this.setState({ testnetstatus: !this.state.testnetstatus });
      this.state.testnetstatus = !this.state.testnetstatus;
    } else if (name === 'In Development') {
      this.setState({ indevelopmentstatus: !this.state.indevelopmentstatus });
      this.state.indevelopmentstatus = !this.state.indevelopmentstatus;
    } else if (name === 'Rugged') {
      this.setState({ ruggedstatus: !this.state.ruggedstatus });
      this.state.ruggedstatus = !this.state.ruggedstatus;
    }
    else if (name === 'Failed') {
      this.setState({ failedstatus: !this.state.failedstatus });
      this.state.failedstatus = !this.state.failedstatus;
    }
    //check incoming name and change that state

    Rows = this.state.projects;

    if (!this.state.livestatus) {
      Rows = Rows.filter(row => row.stage !== null && row.stage !== ''
        && !row.stage.toLowerCase().includes('live'));
    }

    if (!this.state.indevelopmentstatus) {
      Rows = Rows.filter(row => row.stage !== null && row.stage !== ''
        && !row.stage.toLowerCase().includes('in development'));
    }

    if (!this.state.testnetstatus) {
      Rows = Rows.filter(row => row.stage !== null && row.stage !== '' 
      && !row.stage.toLowerCase().includes('testnet'));
    }

    if (!this.state.ruggedstatus) {
      Rows = Rows.filter(row => !row.stage.toLowerCase().includes('rugged'));
    }

    if (!this.state.failedstatus) {
      Rows = Rows.filter(row => !row.stage.toLowerCase().includes('failed'));
    }



    if (Rows) {
      this.setState({ filterAbleProjects: Rows });
    }


  }

  filterChange = (event, name) => {
    console.log("change" + name);
    if (!event.target.checked) {
      this.cancelSearch();
    } else {
      const filteredRows = this.state.filterAbleProjects.filter(row => {
        return row.type.toLowerCase().includes(name.toLowerCase());
      });
      this.setState({ filterAbleProjects: filteredRows });
    }
  }



  cancelSearch = () => {
    this.setState({ searched: null, filterAbleProjects: this.state.projects });
  };

  createRows(data) {
    var rows = [];

    for (let index = 0; index < data.length; index++) {
      const item = data[index];
      var row = {
        icon: item.imageUrl,
        id: index,
        project: item.name,
        type: item.type,
        tokentype: item.tokenType,
        ticker: item.ticker,
        stage: item.stage,
      };
      rows.push(row);
    }
    this.setState({ projects: rows, loading: false, filterAbleProjects: rows });
    this.state.projects = rows;
  }

  handleRowClick(rowData) {
    this.setState({ redirect: true, redirectProject: rowData.project });
  }

  renderRedirectProj = (rowData) => {
    if (this.state.redirect) {
      return <Navigate to={'/projectdetails/' + this.state.redirectProject} />;
    }
  };

  

  render() {
    return (

      <Page className="AllProjects"
        breadcrumbs={[{ name: 'All Projects', active: true }]}
      >
        {this.renderRedirectProj()}
        {this.state.loading ? (
          <div>
            <CircleLoader
              loading={this.state.loading}
              css={override}
              size={100}
            />
          </div>
        ) : (
          <Row style={{
            justifyContent: 'center',
          }}>
            <Col lg={10} md={10} sm={12} xs={12} className="mb-3">
              {/* {this.state.smallScreen != true && (
                <div className="chart">
                  <Bar
                    data={this.state.barChartData}
                    height={50}
                  // options={this.state.barChartData.options}
                  />
                </div>
              )} */}

              <Card>
                <Row style={{
                  justifyContent: 'left',
                }}>
                  {!this.state.smallScreen &&
                  <Col lg={2} md={3} sm={12} xs={12} className="mb-3">
                    <SearchBar
                      value={this.state.searched}
                      onChange={searchVal => this.requestSearch(searchVal)}
                      onCancelSearch={() => this.cancelSearch()}
                    />
                    <br></br>
                    <Col>
                      <FormGroup style={{
                        marginLeft: '20px'
                      }}>
                        <span style={{ fontWeight: 'bold' }}>Status Filters</span>
                        <FormControlLabel key={1} control={<Checkbox checked={this.state.livestatus} onChange={e => this.filterStatusChange('Live')} />} label='Live' />
                        <FormControlLabel key={3} control={<Checkbox checked={this.state.testnetstatus} onChange={e => this.filterStatusChange('Testnet')} />} label='Testnet' />
                        <FormControlLabel key={2} control={<Checkbox checked={this.state.indevelopmentstatus} onChange={e => this.filterStatusChange('In Development')} />} label='In Development' />
                        <FormControlLabel key={4} control={<Checkbox checked={this.state.ruggedstatus} onChange={e => this.filterStatusChange('Rugged')} />} label='Rugged' />
                        <FormControlLabel key={4} control={<Checkbox checked={this.state.failedstatus} onChange={e => this.filterStatusChange('Failed')} />} label='Failed' />
                        <br></br>
                        <span style={{ fontWeight: 'bold' }}>Type Filters</span>
                        {tagOptions.map((item, index) => {
                          return (

                            <FormControlLabel key={index} control={<Checkbox onChange={e => this.filterChange(e, item.name)} />} label={item.name} />

                          );
                        })}
                      </FormGroup>
                    </Col>
                  </Col>}

                  <Col lg={9} md={7} sm={12} xs={12} className="mb-3">
                    <div
                      style={{ height: '200vh', width: '100%' }}
                      className={useStyles.root}
                    >
                      {this.state.smallScreen ? (
                        <DataGrid
                          rowHeight={70}
                          rows={this.state.filterAbleProjects}
                          columns={columnsMobile}
                          onRowClick={rowData => this.handleRowClick(rowData.row)}
                        />
                      ) : (
                        <DataGrid
                          rowHeight={70}
                          rows={this.state.filterAbleProjects}
                          columns={columns}
                          onRowClick={rowData => this.handleRowClick(rowData.row)}
                        />
                      )}
                    </div>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </Page>
    );
  }
}
export default withRouter(AllProjects);
