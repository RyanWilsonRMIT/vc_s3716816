import Header from './components/partials/header.js'
import Footer from './components/partials/footer.js'
import Home from './components/home.js'
import LoginRegister from './components/loginRegister.js'
import Profile from "./components/profile.js"
import {Route, Switch, useLocation } from "react-router-dom";
import './App.css';
import {getMessages} from "./components/helper/addMessage.js";
import Search from "./components/search.js"
import queryString from 'query-string'

function App() {
  const search = useLocation().search
  const {q} = queryString.parse(search)
  let messages=getMessages();
  return (
    <div>
      <Header/>
      <main>
        {messages}
        <Switch>
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
              <Route path="/search">
                <Search q={q}
                  />
              </Route>
              <Route path="/">
                <Home username={"Ryan"}
                  />
              </Route>
            </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
