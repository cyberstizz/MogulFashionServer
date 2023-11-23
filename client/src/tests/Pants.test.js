// Import necessary libraries
const React = require('react');
const { expect } = require('chai');
const { mount } = require('enzyme');
const { JSDOM } = require('jsdom');
const sinon = require('sinon');
const Axios = require('axios');

// Component to be tested
const Pants = require('./Pants'); // Adjust the path according to your project structure

// Set up the DOM environment
const { window } = new JSDOM('<!doctype html><html><body></body></html>');
global.window = window;
global.document = window.document;

describe('Pants Component', () => {
  // Mocking Axios for API call
  before(() => {
    sinon.stub(Axios, 'get').resolves({ data: [{ _id: '1', title: 'Sample Pants', imagePath: 'path/to/image' }] });
  });

  after(() => {
    Axios.get.restore();
  });

  it('renders without crashing', () => {
    const wrapper = mount(<Pants />);
    expect(wrapper.find('.submenuBody')).to.have.lengthOf(1);
  });

  it('displays loader initially', () => {
    const wrapper = mount(<Pants />);
    expect(wrapper.find('Loader')).to.have.lengthOf(1);
  });

  it('renders pants data from API', done => {
    const wrapper = mount(<Pants />);
    setTimeout(() => {
      wrapper.update();
      expect(wrapper.find('SubMenuComponent')).to.have.lengthOf(1);
      expect(wrapper.find('.submenuNavItem')).to.have.lengthOf(3); // Check for nav items
      done();
    }, 0);
  });

  // Additional tests can be added here
});

