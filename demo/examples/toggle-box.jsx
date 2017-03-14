var React = require('react');
var alertContainer = require('react-alert');
import AlertContainer from 'react-alert';
var VelocityComponent = require('../../velocity-component');
var tweenState = require('react-tween-state');
var s = require('underscore.string');

var Box = require('../components/box');

var EFFECTS = [
  'fade',
  'flipX',
  'flipY',
  'flipBounceX',
  'flipBounceY',
  'swoop',
  'whirl',
  'shrink',
  'expand',
  'bounce',
  'bounceUp',
  'bounceDown',
  'bounceLeft',
  'bounceRight',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'slideUpBig',
  'slideDownBig',
  'slideLeftBig',
  'slideRightBig',
  'perspectiveUp',
  'perspectiveDown',
  'perspectiveLeft',
  'perspectiveRight',
];

var ToggleBox = React.createClass({
  displayName: 'ToggleBox',

  mixins: [ tweenState.Mixin ],

  getInitialState: function () {
    return {
      effect: EFFECTS[0],
      isIn: true,
      counter: 0,
      alertOptions : {
        offset: 14,
        position: 'bottom left',
        theme: 'dark',
        time: 5000,
        transition: 'scale'
      },
    };
  },

  componentWillMount: function () {
    // Tweening shows how animations work given re-renders
    this.startTweening();
  },

  startTweening: function () {
    this.tweenState('counter', {
      duration: 5000,
      endValue: 100,
      onEnd: this.reverseTweening,
    });
  },

  reverseTweening: function () {
    this.tweenState('counter', {
      duration: 5000,
      endValue: 0,
      onEnd: this.startTweening,
    });
  },

  whenToggleClicked: function () {
    this.setState({
      isIn: !this.state.isIn,
    });
  },

  showAlert: function(){
    msg.show('Some text or component', {
      time: 2000,
      type: 'success',
      // icon: <img src="../1.png"/>
    });
  },

  whenSelectChanged: function (evt) {
    this.setState({
      effect: evt.target.value,
      isIn: true,
    });
  },

  render: function () {
    var animation = 'transition.' + this.state.effect + (this.state.isIn ? 'In' : 'Out');

    return (
      <div className="flex-box flex-column flex-1 align-items-center">
        <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
        <Box className="flex-1 flex-box flex-column align-items-center" style={{backgroundColor: '#f5f5f5'}} onClick={this.whenToggleClicked} instruction="Click!">
          {/*
            Use of key here keeps the component (and its set styles) from persisting across effects.
            Avoids flashing when switching effects.
          */}
          <VelocityComponent key={this.state.effect} animation={animation}>
            <Box></Box>
          </VelocityComponent>
        </Box>
        <button onClick={this.showAlert}>show alert</button>
      </div>
    );
  },

  renderEffects: function () {
    return EFFECTS.map(function (effect) {
      return (<option key={effect} value={effect}>{s.titleize(s.humanize(effect))}</option>);
    });
  },
});

module.exports = ToggleBox;
