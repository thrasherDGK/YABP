import React, { PropTypes as PT } from 'react';
import moment from 'moment';

const MetaInfo = ({ author, createdAt, updatedAt }) => {
  return (
    <div>
      <span>{author}</span><br />
      {
        createdAt === updatedAt
        ? <span>created: {moment(createdAt).fromNow()}</span>
        : <span>updated: {moment(updatedAt).fromNow()}</span>
      }
    </div>
  );
};

MetaInfo.propTypes = {
  author: PT.string,
  createdAt: PT.string.isRequired,
  updatedAt: PT.string.isRequired,
};

MetaInfo.defaultProps = {
  author: 'Anonymous',
};

export { MetaInfo };
