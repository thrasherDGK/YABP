import React, { Component } from 'react';
import { sortBy, chain } from 'lodash';
import moment from 'moment';
import request from 'superagent';
import { Grid } from 'semantic-ui-react';

import BlogList from 'components/BlogList';
import PieChart from 'components/PieChart';

class BlogPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      blogItems: [],
      showChart: true,
    };

    this.handleItemUpdate = this.handleItemUpdate.bind(this);
    this.handleChartClose = this.handleChartClose.bind(this);
  }

  componentDidMount() {
    this.fetchPosts();
  }

  sortBlogItems(blogItems) {
    this.setState({
      blogItems: sortBy(blogItems, ({ meta }) => moment(meta.updatedAt)).reverse(),
    });
  }

  fetchPosts() {
    request.get(
      'http://localhost:3001',
      {},
      (err, res) => this.sortBlogItems(res.body),
    );
  }

  handleItemUpdate(updatedItem) {
    const items = this.state.blogItems;
    const updatedItems = [...items.filter(item => item.id !== updatedItem.id), updatedItem];

    this.sortBlogItems(updatedItems);
  }

  handleChartClose() {
    this.setState({
      showChart: !this.state.showChart,
    });
  }

  render() {
    const items = this.state.blogItems;
    const chartItems =
      chain(items)
        .filter(({ meta }) => Number(meta.likeCount) > 0)
        .map(({ title, meta }) => [title, Number(meta.likeCount)])
        .value();

    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column width={12}>
            <BlogList items={items} handleItemUpdate={this.handleItemUpdate} />
          </Grid.Column>
          <Grid.Column width={4}>
            { this.state.showChart &&
              <PieChart items={chartItems} handleChartClose={this.handleChartClose} /> }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BlogPage;
