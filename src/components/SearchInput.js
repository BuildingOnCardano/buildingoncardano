import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import Select from 'react-select';
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const searchList = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

const StyledSearch = styled(Select)`
 width: 300px;
 padding: 20px;
 .select__menu-list::-webkit-scrollbar{
   width: 4px;
   height: 0px;
 }
 .select__menu-list::-webkit-scrollbar-track{
   background: #f1f1f1;
 }
 .select__menu-list::-webkit-scrollbar-thumb{
   background: #888;
 }
 .select__menu-list::-webkit-scrollbar-thumb:hover{
   background: #555;
 }
`

class SearchInput extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
  };
  render() {
    const { selectedOption } = this.state;



    return (
      <div style={{ width: 250, cursor: 'pointer' }}>
        <Select
          value={selectedOption}
          options={searchList}
          onChange={this.handleChange}
          styles={customStyles}
          placeholder="Search..."
          openMenuOnClick={false}

          classNamePrefix="select"
          styles={customStyles}
          width='200px'
          menuColor='red'



        // components={ {DropdownIndicator} }
        />
      </div>
    );
  }
}

export default SearchInput;


const customStyles = {
  control: (base, state) => ({
    ...base,
    fontFamily: 'Times New Roman',
    fontSize: 18,
    border: state.isFocused ? 0 : 0,
    boxShadow: state.isFocused ? 0 : 0,
    cursor: 'text',
    borderRadius: 0,
    borderBottom: 'solid 1px',
  }),

  option: (styles, { isFocused }) => {
    return {
      ...styles,
      cursor: 'pointer',
      backgroundColor: isFocused ? 'white' : 'white',
      color: isFocused ? 'rgba(255, 80, 86)' : 'black',
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
    color: 'rgba(255, 80, 86)',
  }),
}
