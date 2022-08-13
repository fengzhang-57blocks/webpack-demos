import sum from './helper/sum';
import '../src/styles/css/style.css';
import '../src/styles/sass/style.scss';
import { hot } from 'react-hot-loader/root';

function indexFunc() {
  console.log('Hello HMR!');
}

console.log(sum(1, 2, 3));

export default hot(indexFunc());
