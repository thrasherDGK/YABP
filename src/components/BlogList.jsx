import React, { DOM, PropTypes as PT } from 'react';
import _ from 'lodash';

import BlogItem from './BlogItem';

const BlogList = ({ items, handleItemUpdate }) => {
  return DOM.ul(
    null,
    _.map(
      items,
      item => React.createElement(BlogItem, { ...item, key: item.id, handleItemUpdate }),
    ),
  );
};

BlogList.propTypes = {
  items: PT.arrayOf(PT.shape(
    _.pick(BlogItem.propTypes, ['id', 'image', 'text', 'meta']),
  )),
  handleItemUpdate: PT.func.isRequired,
};

export default BlogList;