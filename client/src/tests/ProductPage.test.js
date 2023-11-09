import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import  chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import moxios from 'moxios';
import { StaticRouter } from 'react-router-dom';
import  ProductPage from'../components/ProductPage';
import { configure } from 'enzyme';
import Adapter from'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

chai.use(chaiEnzyme()); // This line tells Chai to use chai-enzyme

describe('<ProductPage />', () => {
  let wrapper;

  beforeEach(() => {
    // Install the moxios stub before each test
    moxios.install();
    // Set up the wrapper with StaticRouter to mock the router context
    wrapper = mount(
      <StaticRouter>
        <ProductPage />
      </StaticRouter>
    );
  });

  afterEach(() => {
    // Uninstall the moxios stub after each test
    moxios.uninstall();
    wrapper.unmount();
  });

  it('renders a loader initially', () => {
    expect(wrapper.find('Loader')).to.exist;
  });

  it('fetches product data on mount', (done) => {
    const expectedProduct = {
      title: 'Test Product',
      headline: 'Test Headline',
      imagePath: 'test.jpg',
      description: 'Test Description',
    };

    // Wait for moxios to catch the Axios request
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedProduct,
      }).then(() => {
        // Update the wrapper after the state has potentially changed
        wrapper.update();
        expect(wrapper.find('.productFont').text()).to.equal(expectedProduct.title);
        expect(wrapper.find('.headlineText').first().text()).to.equal(expectedProduct.headline);
        expect(wrapper.find('.productDescription').text()).to.equal(expectedProduct.description);
        expect(wrapper.find('img').prop('src')).to.equal(expectedProduct.imagePath);
        done(); // Signal Mocha to end the test
      });
    });
  });

  // More tests for error handling, clicking the back button, etc.
});
