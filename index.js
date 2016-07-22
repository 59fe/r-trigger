'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
var Trigger = function (_Component) {
    _inherits(Trigger, _Component);

    function Trigger(props) {
        _classCallCheck(this, Trigger);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Trigger).call(this, props));

        _this.handleDocumentClick = _this.handleDocumentClick.bind(_this);
        _this.handleClick = _this.handleClick.bind(_this);
        return _this;
    }

    _createClass(Trigger, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.props.bindOuterClick && document.addEventListener('mousedown', this.handleDocumentClick, true);
            this.props.bindOuterClick && document.addEventListener('touchstart', this.handleDocumentClick, true);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.props.bindOuterClick && document.removeEventListener('mousedown', this.handleDocumentClick);
            this.props.bindOuterClick && document.removeEventListener('touchstart', this.handleDocumentClick);
        }
    }, {
        key: 'handleDocumentClick',
        value: function handleDocumentClick(e) {
            var _this2 = this;

            if (this.tapTimmer) {
                clearTimeout(this.tapTimmer);
            }
            var target = e.target;
            var selfNode = _reactDom2.default.findDOMNode(this);
            if (selfNode !== target && !selfNode.contains(target)) {
                // 防止短时间内连续触发多次
                this.tapTimmer = setTimeout(function () {
                    if (typeof _this2.props.onOuterClick === 'function') {
                        _this2.props.onOuterClick(target);
                    }
                    _this2.tapTimmer = null;
                });
            }
        }

        // fixme 为什么会触发两次?

    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var _this3 = this;

            if (this.triggerTimmer) {
                clearTimeout(this.triggerTimmer);
            }
            this.triggerTimmer = setTimeout(function () {
                if (typeof _this3.props.onClick === 'function') {
                    _this3.props.onClick(e);
                }
                _this3.triggerTimmer = null;
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var children = _props.children;
            var onClick = _props.onClick;

            var others = _objectWithoutProperties(_props, ['children', 'onClick']);

            others.onClick = this.handleClick;

            if (typeof children === 'string') {
                return _react2.default.createElement(
                    'span',
                    others,
                    children
                );
            } else {
                var child = _react2.default.Children.only(children);
                return _react2.default.cloneElement(child, others);
            }
        }
    }]);

    return Trigger;
}(_react.Component);

Trigger.propTypes = {
    onOuterClick: _react.PropTypes.func,
    onClick: _react.PropTypes.func,
    bindOuterClick: _react.PropTypes.bool // 是否绑定元素外点击事件
};

Trigger.defaultProps = {
    bindOuterClick: false
};

exports.default = Trigger;
module.exports = exports['default'];
