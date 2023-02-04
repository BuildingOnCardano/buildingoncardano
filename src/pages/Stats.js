import Page from 'components/Page';
import React from 'react';
import { Col, Card, CardHeader, CardBody, Row, CardTitle } from 'reactstrap';
import CircleLoader from 'react-spinners/CircleLoader';
import { css } from '@emotion/core';
import { baseUrl, getProjectsStatsStatus, getProjectsStatsTypes } from '../assets/services';
import '../styles/styles.css';
import { removeUserSession } from 'utils/Common.js';
import { isEmpty } from 'utils/stringutil.js';
import { useParams } from 'react-router-dom';
import { Bar, Doughnut } from 'react-chartjs-2';
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

class Stats extends React.Component {
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
      pieChartData: null,
      projectTypesStatusAndCount: [],
      totalProjectsStatus: ''
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

    await this.getProjectsStatsStatus();
    await this.getProjectsStatsTypes();

  }
  async getProjectsStatsStatus() {
    try {
      var response = await fetch(baseUrl + getProjectsStatsStatus);
      const data = await response.json();

      var labels = [];
      var counts = [];
      data.projectTypesAndCount.forEach(element => {
        labels.push(element.projectType);
        counts.push(element.projectCount);
      });

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: '# of Types',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(31,179,124, 0.6)',
              'rgba(75, 192, 192, 0.8)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(31,179,124, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };

      this.setState({
        totalProjectsStatus: data.totalProjects,
        projectTypesStatusAndCount: data.projectTypesAndCount,
        pieChartData: chartData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getProjectsStatsTypes() {
    try {
      var response = await fetch(baseUrl + getProjectsStatsTypes);
      const data = await response.json();

      var labels = [];
      var counts = [];
      data.projectTypesAndCount.forEach(element => {
        labels.push(element.projectType);
        counts.push(element.projectCount);
      });

      var chartData = {
        labels: labels,
        datasets: [
          {
            label: '# of Types',
            data: counts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.4)',
              'rgba(31,179,124, 0.6)',
              'rgba(75, 192, 192, 0.8)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.4)',
              'rgba(144,14,249, 0.6)',
              'rgba(54, 162, 0, 0.8)',
              'rgba(255, 100, 86, 0.2)',
              'rgba(165,239,83, 0.4)',
              'rgba(120, 102, 255, 0.6)',
              'rgba(164,113,111, 0.8)',
              'rgba(178,135,21, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(31,179,124, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(144,14,249, 1 )',
              'rgba(54, 162, 0, 1)',
              'rgba(255, 100, 86, 1)',
              'rgba(165,239,83, 1)',
              'rgba(120, 102, 255, 1)',
              'rgba(164,113,111, 1)',
              'rgba(178,135,21, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

      this.setState({
        totalProjects: data.totalProjects,
        projectTypesAndCount: data.projectTypesAndCount,
        barChartData: chartData,
      });
      this.setState({ loading: false });
    } catch (error) {
      console.log(error);
    }

  }

  render() {
    return (

      <Page className="AllProjects"
        breadcrumbs={[{ name: 'Project Stats', active: true }]}
      >
        {this.state.loading ? (
          <div>
            <CircleLoader
              loading={this.state.loading}
              css={override}
              size={100}
            />
          </div>
        ) :
          <Row>
            <Col lg={6} md={12} sm={10} xs={12} className="mb-3">
              <Card>
                <CardBody>
                  <CardTitle><b>Project Status</b></CardTitle>
                  <CardTitle>Total Projects: {this.state.totalProjectsStatus}</CardTitle>
                  <Doughnut
                    data={this.state.pieChartData}
                    height={120}
                  // options={this.state.barChartData.options}
                  />
                </CardBody>

              </Card>
            </Col>
            <Col lg={6} md={12} sm={10} xs={12} className="mb-3">
              <Card>
                <CardBody>
                  <CardTitle><b>Project Types</b></CardTitle>
                  <CardTitle>Total Projects: {this.state.totalProjects} *Excludes rugged</CardTitle>
                  <Bar
                    data={this.state.barChartData}
                    height={120}
                  // options={this.state.barChartData.options}
                  />
                </CardBody>

              </Card>
            </Col>
          </Row>}

      </Page>
    );
  }
}
export default withRouter(Stats);
