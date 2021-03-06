import { connect } from 'react-redux';

import Search from 'components/Search';
import { search, changeSearchTerm } from 'actions/Search';

import history from 'helpers/history';
import { postPath } from 'helpers/routes';

const stateToProps = (state) => {
  const { isLoading, results, value } = state.search;
  return { isLoading, results, value };
};

const actionsToProps = dispatch => ({
  processTermChange(term) {
    dispatch(changeSearchTerm(term));
  },

  processSearch(value) {
    if (value.length >= 3) {
      dispatch(search({ q: value }));
    }
  },

  handleResultSelect(e, result) {
    history.push(postPath(result.id));
  },
});

export default connect(stateToProps, actionsToProps)(Search);
