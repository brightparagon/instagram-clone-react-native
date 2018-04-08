import Reactotron from 'reactotron-react-js';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure({name: 'insta-clone'})
  .use(reactotronRedux())
  .connect();

export default Reactotron;