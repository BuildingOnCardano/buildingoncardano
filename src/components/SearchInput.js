import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input, Col, Card, CardHeader } from 'reactstrap';
import Select, { components } from 'react-select';
import { useParams, Navigate } from 'react-router-dom';
import ReactImageFallback from 'react-image-fallback';
import CardanoImage from 'assets/img/cardanoIcon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
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
const width = window.innerWidth;

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
            {item.imageUrlBase64 ?
              <ReactImageFallback
                src={item.imageUrlBase64}
                width="30px"
                height="30px"
                fallbackImage={CardanoImage}
              />
              :
              item.imageUrl ?
                <ReactImageFallback
                  src={item.imageUrl}
                  width="30px"
                  height="30px"
                  fallbackImage={CardanoImage}
                />
                :
                <ReactImageFallback
                  src={CardanoImage}
                  width="30px"
                  height="30px"
                  fallbackImage={CardanoImage}
                />
            }
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

  renderRedirectToProject() {
    if (this.state.redirect) {
      this.setState({ redirect: false })
      return <Navigate to={'/projectdetails/' + this.state.projectName} replace={true} />;
    }
  };

  render() {
    const { selectedOption } = this.state;
    return (
      <div >
        {this.renderRedirectToProject()}
        {this.state.options != null && <Select
          classNamePrefix="my-select"
          options={this.state.options}
          onChange={selectedOption => this.handleChange(selectedOption)}
          styles={width <= 700 ? mobileStyle : standardStyle}
          placeholder="Search Projects..."
          openMenuOnClick={true}
          // classNamePrefix="select"
          openMenuOnFocus={false}
          menuPortalTarget={document.body}
          menuPosition={'fixed'}
          menuColor='blue'
          components={{ DropdownIndicator }}
        />}
      </div>
    );
  }
}

export default withRouter(SearchInput);

const mobileStyle = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    width: '60vw',
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
    width: '30vw',
    padding: '0.5em',
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
