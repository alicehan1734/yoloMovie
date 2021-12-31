import './App.css';
import {HashRouter as Router, Route} from "react-router-dom";
import Home from './routes/home';
import Detail from './routes/detail';

function App() {
  return (
    <Router>

      <Route exact path="/" component={Home} />
      <Route path="/:id" component={Detail} />

    </Router>
  );
}

export default App;
