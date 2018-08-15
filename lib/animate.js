'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d = require('d3');

var _d2 = _interopRequireDefault(_d);

var _d3Timer = require('d3-timer');

var _d3Timer2 = _interopRequireDefault(_d3Timer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Animation = function (_Component) {
  _inherits(Animation, _Component);

  function Animation(props) {
    _classCallCheck(this, Animation);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Animation).call(this, props));

    _this.state = _this.props;
    return _this;
  }

  _createClass(Animation, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _props = this.props;
      var ease = _props.ease;
      var duration = _props.duration;
      var fps = _props.fps;
      var delay = _props.delay;


      var that = this;

      if (that.animateTimeout) that.animateTimeout.stop();
      if (that.animateInterval) that.animateInterval.stop();

      var frame = 0;
      var time = fps * duration / 1000;
      var updateState = this.updateState.bind(this);
      var filter = _lodash2.default.omit(this.state, ['ease', 'duration', 'fps', 'delay']);

      _d2.default.interpolators.push(function (a, b) {
        _d2.default.ease(ease);
      });

      // register interpolate
      this.interpolate = {};

      _lodash2.default.forIn(filter, function (val, key) {
        if ((_lodash2.default.isObject(val) || _lodash2.default.isNumber(val) || _lodash2.default.isString(val) || _lodash2.default.isArray(val)) && !_lodash2.default.isFunction(val)) that.interpolate[key] = _d2.default.interpolate(that.state[key], nextProps[key]);
      });

      this.animateTimeout = _d3Timer2.default.timeout(function () {
        that.animateInterval = _d3Timer2.default.interval(function () {
          frame++;

          var newState = {};
          _lodash2.default.forIn(filter, function (val, key) {
            if ((_lodash2.default.isObject(val) || _lodash2.default.isNumber(val) || _lodash2.default.isString(val) || _lodash2.default.isArray(val)) && !_lodash2.default.isFunction(val)) newState[key] = that.interpolate[key](frame / time);
          });

          updateState(newState);

          if (frame >= time) that.animateInterval.stop();
        }, 1000 / time);
      }, delay);
    }
  }, {
    key: 'updateState',
    value: function updateState(props) {
      this.setState(props);
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children(this.state);
    }
  }]);

  return Animation;
}(_react.Component);

Animation.defaultProps = {
  ease: 'circle',
  duration: 250,
  delay: 0,
  fps: 60
};
Animation.propTypes = {
  ease: _react.PropTypes.string.isRequired,
  duration: _react.PropTypes.number.isRequired,
  delay: _react.PropTypes.number.isRequired,
  fps: _react.PropTypes.number.isRequired
};
exports.default = Animation;
module.exports = exports['default'];