import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from './react-redux';

class ThemeSwitch extends Component {
	static contextTypes={
    onSwitchColor: PropTypes.func
	}
	switchColor(color){
		if (this.props.onSwitchColor) {
      this.props.onSwitchColor(color);
    }
	}
  render () {
    return (
      <div>
        <button onClick={this.switchColor.bind(this,'red')}>Red</button>
        <button onClick={this.switchColor.bind(this,'blue')}>Blue</button>
      </div>
    )
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSwitchColor: (color) => {
      dispatch({ type: 'CHANGE_COLOR', themeColor: color })
    }
  }
};
ThemeSwitch = connect(null,mapDispatchToProps)(ThemeSwitch)

export default ThemeSwitch;