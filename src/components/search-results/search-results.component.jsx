import React, { Component } from 'react';
import { connect } from 'react-redux';
import ResultItem from '../result-item/result-item.component';
import PageTurner from '../page-turner/page-turner.component';

class SearchResults extends Component {
  render() {
    const { repos, search, isFetching } = this.props;

    return (
      <div data-test="search-results" className='d-flex flex-column mt-3'>
        {(!search || !search.itemsCount) && (
          <div>
            <h4><strong>No results available</strong></h4>
            <span className="text-muted">Did you type anything in the box above yet? Try 'tetris' :)</span>
          </div>
        )}

        {search && search.itemsCount && (
          <>
            <div className='col-12'>
              <h5 className='float-left'>Search Results: {search.itemsCount}</h5>
            </div>
            <div className='col-12 mt-3'>
              {!isFetching && repos.map((repo) =>(
                <ResultItem key={repo.id} repo={repo} />
              ))}
            </div>

            <PageTurner />
          </>
        )}

      </div>
    )
  }
}

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
