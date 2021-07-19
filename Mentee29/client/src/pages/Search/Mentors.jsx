import React, { Component } from 'react';
import MentorItem from './MentorItem';

export default class Mentors extends Component {
  // the main render method for the search component
  render() {
    return (
      <div>
        {this.props.searched === true &&
          (this.props.results.length > 0 ? (
            <div>
              {this.props.results.map((mentor) => (
                <MentorItem key={mentor.id} mentor={mentor} />
              ))}
            </div>
          ) : (
            <h4>No matching mentors</h4>
          ))}
      </div>
    );
  }
}
