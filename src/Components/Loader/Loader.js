import Loader from "react-loader-spinner";
import { Component } from "react";
export default class App extends Component {
  
  render() {
    return (
      <Loader
        type="Circles"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} 
      />
    );
  }
}