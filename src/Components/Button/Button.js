import { Component } from "react";
import './Button.scss';
import styled from "styled-components";
import PropTypes from 'prop-types';

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

class ButtonComponent extends Component {
    state = {
        page: 2,
    }
    
    
    onLoadMore = () => {
        this.setState({ page: this.state.page + 1 });
        this.props.onLoadMore(this.state.page);
    };
   
    render(){
        return (
            <Button type='button' className='btn' onClick={this.onLoadMore}>
            Load more
        </Button>
        )
    }
}

ButtonComponent.propTypes = {
    onLoadMore: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
}

export default ButtonComponent;