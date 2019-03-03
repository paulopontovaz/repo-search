import React from 'react';
import './search-results.scss';
import { connect } from 'react-redux';
import ResultItem from '../result-item/result-item.component';
import PageTurner from '../page-turner/page-turner.component';
import spinner from '../../assets/images/loading.gif';

export const SearchResults = ({ repos, search, isFetching }) => (
  <div data-test="search-results" className='d-flex flex-column mt-3'>
    {!isFetching && search && (
      <>
        <div className='col-12'>
          <h5 className='float-left'>
            Search Results:
            <span className='ml-2' data-test="search-items-count">{search.itemsCount}</span>
          </h5>
        </div>
        <div className='col-12 mt-3'>
          {!isFetching && repos && repos.map((repo) =>(
            <ResultItem data-test="result-item" key={repo.id} repo={repo} />
          ))}
        </div>

        {repos && repos.length > 0 && (<PageTurner data-test="page-turner" />)}
      </>
    )}

    {isFetching && (
      <div className="spinner-container col-12 d-flex justify-content-center">
        <img src={spinner} alt="Loading"/>
      </div>
    )}

    {!isFetching && (!search || !search.itemsCount) && (
      <div data-test="no-results-message">
        <h4><strong>No results available</strong></h4>
        <span className="text-muted">Did you type anything in the box above yet? Try 'tetris' :)</span>
      </div>
    )}
  </div>
);

const mapStateToProps = ({
  repos,
  loading,
  search,
}) => ({
  repos,
  isFetching: loading.isFetching,
  search,
});

export default connect(mapStateToProps)(SearchResults);
