import React from 'react';
import './header.scss';
import { DebounceInput } from 'react-debounce-input';
import { connect } from "react-redux";
import { fetchRepos } from '../../store/repositories/actions';

export class Header extends React.Component {
  handleSearchTextChange(query) {
    this.props.getRepos(query, 1);
  }

  render() {
    return (
      <div data-test="app-header" className='app-header'>
        <h3>
          <i className="fab fa-github-alt" />
          <span>Repo Search</span>
        </h3>
        <div id='search-bar'>
          <DebounceInput
            data-test="search-box"
            placeholder="Type a repo name here"
            className='form-control form-control-lg'
            debounceTimeout={300}
            onChange={(event) => this.handleSearchTextChange(event.target.value)}
            id="search-text-input"
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRepos: (query, page) => dispatch(fetchRepos(query, page)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Header);
