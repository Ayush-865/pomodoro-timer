// Portal utility - components can be rendered outside of the main root div
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const portalEl = document.createElement('div');
portalEl.setAttribute('id', 'portal');
const portalRoot: HTMLElement =
  document.getElementById('portal') || document.body.appendChild(portalEl);

export default class Portal extends Component<{
  children?: React.ReactNode;
}> {
  el: HTMLElement = document.createElement('div');

  componentDidMount = () => {
    portalRoot.appendChild(this.el);
  };

  componentWillUnmount = () => {
    portalRoot.removeChild(this.el);
  };

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
