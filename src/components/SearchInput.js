import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input, Col, Card, CardHeader } from 'reactstrap';
import Select from 'react-select';
import { Link, Redirect } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import CardanoImage from 'assets/img/cardanoIcon.png';

const width = window.innerWidth;

class SearchInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedOption: null,
      options: null,
      redirect: false,
      projectName: ""
    };
  }


  componentDidMount() {
    var data = this.props.projects;
    var options = [];
    data.forEach(item => {
      var option = { value: item.name, label: <div>                          
      <ReactImageFallback
        src={item.imageUrl}
        width="30px"
        height="30px"
        fallbackImage={CardanoImage} />{item.name}</div> };
      options.push(option);
    });
    this.setState({ options: options });
  }

  handleChange = selectedOption => {
    this.setState({ redirect: true, projectName: selectedOption.value });
  };

  renderRedirectToLogin = () => {
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/projectdetails/'+this.state.projectName }} />
    }
  }

  render() {
    const { selectedOption } = this.state;
    const { match, location, history } = this.props;


    return (
      
      <div className="serach-tab">
        {this.renderRedirectToLogin()}
        <Select
          value={selectedOption}
          options={this.state.options}
          onChange={this.handleChange}
          styles={width <= 700 ? mobileStyle : standardStyle}
          placeholder="Search Project..."
          openMenuOnClick={true}
          classNamePrefix="select"
          menuColor='blue'
        // components={{ DropdownIndicator }}
        />
      </div>
    );
  }
}

export default SearchInput;


const mobileStyle = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    borderBottom: '1px',
    width: '70vw',
    padding: '0.3em'
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
    fontFamily: 'Times New Roman, Times, Serif',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
};

const standardStyle = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    borderBottom: '1px',
    width: '36vw',
    padding: '0.3em'
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    }
  },

  input: styles => ({
    ...styles,
    color: 'black',
  }),

  menu: styles => ({
    ...styles,
    marginTop: 0,
    boxShadow: 'none',
    borderRadius: 0,
  }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
}
