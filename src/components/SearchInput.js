import React from 'react';
import { MdSearch } from 'react-icons/md';
import { Form, Input } from 'reactstrap';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

class SearchInput extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;

    return (
      <div style={{ width: 250, cursor: 'pointer' }}>
      <Select 
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        
      />
      </div>
    );
  }
}

export default SearchInput;
