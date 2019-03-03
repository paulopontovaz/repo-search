import React from 'react';
import { connect } from 'react-redux';
import ResultItem from '../result-item/result-item.component';
import PageTurner from '../page-turner/page-turner.component';

export const SearchResults = ({ repos, search, isFetching }) => (
  <div data-test="search-results" className='d-flex flex-column mt-3'>
    {(!search || !search.itemsCount) && (
      <div data-test="no-results-message">
        <h4><strong>No results available</strong></h4>
        <span className="text-muted">Did you type anything in the box above yet? Try 'tetris' :)</span>
      </div>
    )}

    {search && search.itemsCount && (
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

        {repos && (<PageTurner data-test="page-turner" />)}
      </>
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
