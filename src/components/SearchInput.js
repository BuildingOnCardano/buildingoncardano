import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input, Col, Card, CardHeader } from 'reactstrap';
import Select, { components } from 'react-select';
import { Link, Navigate } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const width = window.innerWidth;

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null,
      options: null,
      redirect: false,
      projectName: '',
    };
  }

  componentDidMount() {
    var data = this.props.projects;
    var options = [];
    data.forEach(item => {
      var option = {
        value: item.name,
        label: (
          <div>
            <ReactImageFallback
              src={item.imageUrl}
              width="30px"
              height="30px"
              fallbackImage={CardanoImage}
            />
            {item.name}
          </div>
        ),
      };
      options.push(option);
    });
    this.setState({ options: options });
  }

  handleChange = selectedOption => {
    this.setState({ redirect: true, projectName: selectedOption.value });
  };

  renderRedirectToProject = () => {
    if (this.state.redirect) {
      return <Navigate to={'/projectdetails/' + this.state.projectName} />;
    }
  };

  render() {
    const { selectedOption } = this.state;
    const { match, location, history } = this.props;

    const ValueContainer = ({ children, ...props }) => {
      return (
        components.ValueContainer && (
          <components.ValueContainer {...props}>
            {!!children && (
              <FontAwesomeIcon
                icon={faSearch}
                style={{ position: 'absolute', left: 6 }}
              />
            )}
            {children}
          </components.ValueContainer>
        )
      );
    };

    const DropdownIndicator = props => {
      return (
        components.DropdownIndicator && (
          <components.DropdownIndicator {...props}>
            <FontAwesomeIcon icon={faSearch} />
          </components.DropdownIndicator>
        )
      );
    };

    return (

      <div className="serach-tab">
        {this.renderRedirectToProject()}
        {this.state.options != null && <Select
          classNamePrefix="my-select"
          value={selectedOption}
          options={this.state.options}
          onChange={this.handleChange}
          styles={width <= 700 ? mobileStyle : standardStyle}
          placeholder="Search Projects..."
          openMenuOnClick={true}
          // classNamePrefix="select"
          openMenuOnFocus={true}
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
          menuColor='blue'
          components={{ DropdownIndicator }}
        />}
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
    padding: '0.3em',
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    };
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
    zIndex: 9999,
  }),

  menu: provided => ({ ...provided, zIndex: 9999 }),

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
    padding: '0.3em',
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(0, 0, 0)' : 'black',
      lineHeight: 2,
    };
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

  menu: provided => ({ ...provided, zIndex: 9999 }),

  singleValue: styles => ({
    ...styles,
    color: 'rgba(0, 0, 0)',
  }),
};
