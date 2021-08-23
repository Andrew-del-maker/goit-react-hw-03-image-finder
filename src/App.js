import React from "react";
import { Component } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  import './App.scss'


import Searchbar from "./Components/Searchbar";
import ImageGallery from "./Components/ImageGallery";
import Button from "./Components/Button";

class App extends Component{
  state = {
    searchQuerry: null,
    page: 1, 
  }
  
  handleFormSubmit = (searchQuerry) => {
    this.setState({ searchQuerry })
  }

  handleLoadMore = (page) => {
    this.setState({ page });
  }
  
  render() {
    const {searchQuerry, page} = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit}/>
        {this.state.searchQuerry &&
          <ImageGallery searchQuerry={searchQuerry} page={page} />}
        {searchQuerry &&
          <Button onLoadMore={this.handleLoadMore} page={page} />}
        
        
        <ToastContainer />
      </div>
    )
  }
}

export default App;
