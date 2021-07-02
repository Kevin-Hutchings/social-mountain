import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Post from './Post/Post';
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
    this.filterPosts = this.filterPosts.bind(this);
    this.reset = this.reset.bind(this);
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then((res) => this.setState({posts: res.data}))
    .catch()
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(res => this.setState({posts: res.data}));
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
    .then(res => this.setState({posts: res.data}));
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text})
    .then(res => this.setState({posts: res.data}));
  }

  filterPosts(input){
    const {posts} = this.state;

    const filteredPosts = posts.filter((post) => {
      return post.text.toLowerCase().includes(input.toLowerCase())
    });
    this.setState({posts: filteredPosts})
  }

  reset(){
    this.componentDidMount();
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header filter={this.filterPosts} reset={this.reset} />
      
        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {posts.map( post => (
          <Post 
            key={post.id} 
            text={post.text} 
            date={post.date}
            id={post.id}
            updatePostFn={this.updatePost}
            deletePostFn={this.deletePost}/> 
            )) 
          }

        </section>
      </div>
    );
  }
}

export default App;
