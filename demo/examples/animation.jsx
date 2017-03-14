var React = require('react');
var VelocityComponent = require('../../velocity-component');
var tweenState = require('react-tween-state');
var s = require('underscore.string');
var Box = require('../components/box');


var effects1 = ['fade'];

var Animation = React.createClass({
	displayName: 'Animation',

  mixins: [ tweenState.Mixin ],

  getInitialState: function () {
    return {
      effect: effects1[0],
      isIn: true,
      counter: 0,
      properties: { opacity: 0.01} ,
    };
  },

  componentWillMount: function () {
    // Tweening shows how animations work given re-renders
    // this.startTweening();
  },

  whenToggleClicked: function () {
    this.setState({
      isIn: !this.state.isIn,
      properties: { opacity: 1/this.state.properties.opacity},
    });
  },

  whenButtonClicked: function () {
    console.log(this.state.isIn);
    this.whenToggleClicked();
    // console.log(this.state.isIn);
    // this.whenToggleClicked();
  },

  render: function () {
    var animation = 'transition.' + this.state.effect + (this.state.isIn ? 'Out' : 'In');

    return (
      <div className="flex-box flex-column flex-1 align-items-center">
        
        <Box className="flex-1 flex-box flex-column align-items-center" style={{backgroundColor: '#f5f5f5'}}  >
          {/*
            Use of key here keeps the component (and its set styles) from persisting across effects.
            Avoids flashing when switching effects.
          */}

          <VelocityComponent key={this.state.effect} animation={animation} duration = {3000}>
            <Box>Hi</Box>
          </VelocityComponent>
        </Box>
        <button onClick={this.whenButtonClicked}>start animation</button>
      </div>
    );
  },

  
});

module.exports = Animation;