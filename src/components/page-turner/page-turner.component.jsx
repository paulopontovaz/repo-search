import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchRepos } from "../../store/repositories/actions";

const PageTurnerButton = ({ clickFunction, active, disabled, children }) => (
  <li className={`page-item${active ? ' active' : ''}${disabled ? ' disabled' : ''}`}>
    <button className="page-link" onClick={clickFunction} disabled={disabled}>{children}</button>
  </li>
);

class PageTurner extends Component {
  selectPage = (page) => {
    const { query, getRepos, pagination } = this.props;

    if (parseInt(pagination.current) !== page)
      getRepos(query, page);
  };

  render() {
    const { pagination } = this.props;

    const pageCount = pagination.last ? parseInt(pagination.last) : parseInt(pagination.prev) + 1;
    const currentPage = parseInt(pagination.current);
    const visiblePagesCount = 5; // Better to be an odd number, so the current page can stay in the middle.
    const firstVisiblePageIndex = currentPage - Math.floor(visiblePagesCount/2) < 1
      ? 1
      : currentPage - Math.floor(visiblePagesCount/2);
    const lastVisiblePageIndex = currentPage + Math.floor(visiblePagesCount/2) > pageCount
      ? pageCount
      : currentPage + Math.floor(visiblePagesCount/2);

    const pageNumbers = [];

    for (let i = firstVisiblePageIndex; i <= lastVisiblePageIndex; i++)
      pageNumbers.push(i);

    return (
      <nav className='col-12 d-flex justify-content-center mt-3'>
        <ul className="pagination">
          <PageTurnerButton clickFunction={() => this.selectPage(1)} disabled={!pagination.prev}>
            <i className="fas fa-angle-double-left"/>
          </PageTurnerButton>
          <PageTurnerButton clickFunction={() => this.selectPage(pagination.prev)} disabled={!pagination.prev}>
            <i className="fas fa-chevron-left"/>
          </PageTurnerButton>
          {pageNumbers && pageNumbers.map((num) => (
            <PageTurnerButton
              active={num === currentPage}
              key={num}
              clickFunction={() => this.selectPage(num)}>{num}</PageTurnerButton>
          ))}

          <PageTurnerButton clickFunction={() => this.selectPage(pagination.next)} disabled={!pagination.next}>
            <i className="fas fa-chevron-right"/>
          </PageTurnerButton>
          <PageTurnerButton clickFunction={() => this.selectPage(pagination.last)} disabled={!pagination.last}>
            <i className="fas fa-angle-double-right"/>
          </PageTurnerButton>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = ({ search }) => ({ ...search });

const mapDispatchToProps = (dispatch) => ({
  getRepos: (query, page) => dispatch(fetchRepos(query, page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageTurner);
