import React from 'react';
import './result-item.scss';

const ResultItem = ({ repo }) => (
  <div data-test="result-item" className="card result-item">
    <div className="card-body">
      <div className='d-flex flex-wrap'>
        <div className='flex-fill text-left'>
          <h4 className="card-title">
            <a data-test="repo-name" href={repo.url}>
              <strong>{repo.name}</strong>
            </a>
          </h4>
        </div>
        <div className='d-flex ml-3'>
          {repo.language && (
            <div className='mr-4'>
              <span data-test="repo-language">{repo.language}</span>
            </div>
          )}
          <div>
            <span data-test="repo-stars">
              <i className="fas fa-star mr-1"/>{repo.stars}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-2 text-left'>
        <h6
          data-test="repo-description"
          className="card-subtitle mb-2 text-muted"
        >
          {repo.description}
        </h6>
      </div>
      <div className='text-right repo-owner'>
        <span className='mr-1'>owned by</span>
        <strong>
          <a data-test="repo-owner" href={repo.owner.url} className="card-link">
            {repo.owner.login}
          </a>
        </strong>
      </div>
    </div>
  </div>
);

export default ResultItem;
