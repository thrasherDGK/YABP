import React, { PropTypes } from 'react';
import { Segment, Item } from 'semantic-ui-react';

const Post = ({ image, title, description }) => (
  <Segment className="main">
    <Item>
      <Item.Image {...image} size="large" floated="right" />

      <Item.Header as="h1">{title}</Item.Header>

      <Item.Description>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Item.Description>
    </Item>
  </Segment>
);

Post.propTypes = {
  image: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Post;