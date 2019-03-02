import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchRepos, DispatchAction } from '../../store/repositories/actions'
import RepositorySearchParams from "../../models/repository-search-params/RepositorySearchParams";
import { Dispatch } from "redux";

class SearchResults extends Component<DispatchAction> {
    componentWillMount() {
        this.props.getRepos(new RepositorySearchParams());
    }

    render() {
        const { repos } = this.props;

        return (
            <div>
                <div>Search Results</div>
                {repos && repos.length && repos.map((repo) =>(
                    <div key={repo.id}>repo</div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = ({ repos, loading }: any) => ({ repos, isFetching: loading.isFetching });

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    getRepos: (searchParams: RepositorySearchParams) => dispatch(fetchRepos(searchParams)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchResults);
