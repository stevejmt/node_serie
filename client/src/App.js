import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {

  return (
    <div className="App">
      <Router>
        <div className="navbar" role="navigation">
        <Link to="/" tabIndex="1"> Home</Link>  
        <Link to="/createpost" tabIndex="2"> Créer une série</Link>
        </div>

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/createpost" exact component={CreatePost}/>
          <Route path="/edit/:id" exact component={EditPost}/> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
