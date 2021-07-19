import React, { Component } from 'react';
import Mentors from './Mentors';

export default class Search extends Component {
  // a constructor with initial set states
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      text: '',
      searchBy: 'name',
      alert: false,
      searched: false,
    };
  }

  // the main render method for the search component
  render() {
    const onSubmit = async (e) => {
      e.preventDefault();
      if (this.state.text === '') {
        this.setState({ alert: true });
      } else {
        this.setState({ alert: false });
        const { text, searchBy } = this.state;
        const data = {
          text,
          searchBy,
        };
        let response = await fetch(`http://localhost:5000/users/searchmentor`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        let result = await response.json();
        console.log(result);
        this.setState({ results: result, text: '', searched: true });
      }
    };

    const onChange = (e) => {
      this.setState({ text: e.target.value, results: [], searched: false });
    };

    const clearText = (e) =>
      this.setState({ text: '', results: [], searched: false });

    const setSearch = (e) => {
      this.setState({ searchBy: e.target.value, text: '', results: [] });
    };

    return (
      <div className='container'>
        <h2>Mentor Search</h2>
        <form onSubmit={onSubmit}>
          {' '}
          <input
            type='radio'
            id='name'
            name='searchBy'
            value='name'
            defaultChecked
            onClick={setSearch}
          />{' '}
          <label htmlFor='name'>Search by name</label>{' '}
          <input
            type='radio'
            id='jobRole'
            name='searchBy'
            value='jobRole'
            onClick={setSearch}
          />{' '}
          <label htmlFor='jobRole'>Search by job role</label>{' '}
          <input
            type='radio'
            id='skill'
            name='searchBy'
            value='skill'
            onClick={setSearch}
          />{' '}
          <label htmlFor='skill'>Search by skill</label>{' '}
          {this.state.searchBy === 'name' ? (
            <input
              type='text'
              name='text'
              placeholder='Search Mentors...'
              value={this.state.text}
              onChange={onChange}
            />
          ) : this.state.searchBy === 'jobRole' ? (
            <select
              value={this.state.text}
              onChange={onChange}
              placeholder='Select Mentors...'
            >
              <option value='' disabled>
                Search Mentors...
              </option>
              <option value='Analyst'>Analyst</option>
              <option value='Data Scientist'>Data Scientist</option>
              <option value='Engineer'>Engineer</option>
              <option value='Secretary'>Secretary</option>
              <option value='Software Developer'>Software Developer</option>
            </select>
          ) : (
            <select
              value={this.state.text}
              onChange={onChange}
              placeholder='Select Mentors...'
            >
              <option value='' disabled>
                Search Mentors...
              </option>
              <option value='Time Management'>Time Management</option>
              <option value='Communication'>Communication</option>
              <option value='Leadership'>Leadership</option>
              <option value='Motivation'>Motivation</option>
              <option value='Confidence'>Confidence</option>
              <option value='Analytical Skills"'>Analytical Skills</option>
              <option value='Managing Ambiguity'>Managing Ambiguity</option>
              <option value='Ability to Work Under Pressure'>
                Ability to Work Under Pressure
              </option>
              <option value='Entrepreneurial skills'>
                Entrepreneurial skills
              </option>
              <option value='Commercial awareness'>Commercial awareness</option>
              <option value='Negotiation'>Negotiation</option>
              <option value='Critical Thinking'>Critical Thinking</option>
              <option value='Problem Solving'>Problem Solving</option>
              <option value='Perseverence'>Perseverence</option>
              <option value='Teamwork'>Teamwork</option>
              <option value='Leadership'>Leadership</option>
              <option value='Organisation'>Organisation</option>
            </select>
          )}
          <input
            type='submit'
            value='Search'
            className='btn btn-dark btn-block'
          />
        </form>
        <button className='btn btn-light btn-block' onClick={clearText}>
          Clear
        </button>
        {this.state.alert === true && <h4>Please enter a valid search</h4>}
        {this.state.searched === true && (
          <Mentors
            results={this.state.results}
            searched={this.state.searched}
          />
        )}
      </div>
    );
  }
}
