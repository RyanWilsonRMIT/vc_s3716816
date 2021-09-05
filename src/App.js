import Header from './components/partials/header.js'
import Footer from './components/partials/footer.js'
import Home from './components/home.js'
import LoginRegister from './components/loginRegister.js'
import Profile from "./components/profile.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import {getMessages} from "./components/helper/addMessage.js";
function App() {
  let messages=getMessages();
  return (
    <div>
      <Router>
        <Header/>
        <main>
          {messages}
          <Switch>
                {/* NOTE: The technique below is to pass down the history property to the Login component. */}
                <Route path="/login" render={props => (
                  <LoginRegister {...props} selected={'login'} />
                )} />
                <Route path="/register" render={props => (
                  <LoginRegister {...props} selected={'register'} />
                )} />
                <Route path="/profile">
                  <Profile
                   />
                </Route>
                <Route path="/">
                  <Home username={"Ryan"}
                   />
                </Route>
              </Switch>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
