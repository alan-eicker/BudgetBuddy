import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow, configure } from 'enzyme';
import App from './App';
import { homeInitialState } from './reducers/home.reducer';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([]);

describe('<App />', () => {
  let app;

  beforeEach(() => {
    const store = mockStore(homeInitialState);

    app = shallow(
      <Provider store={store}>
        <App />
      </Provider>,
    );
  });

  it('Should render without errors', () => {
    expect(app).toHaveLength(1);
  });
});
