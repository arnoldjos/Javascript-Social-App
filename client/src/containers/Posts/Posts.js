import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PostForm from './PostForm/PostForm';
import PostFeed from './PostFeed/PostFeed';
import Spinner from '../../components/common/Spinner/Spinner';
import { getPosts } from '../../store/actions';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Spinner />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    post: state.post
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch(getPosts())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts);
