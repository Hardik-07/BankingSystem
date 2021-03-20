import {BrowserRouter as Router,Route,Switch,Redirect} from "react-router-dom";
//import { Offline, Online } from "react-detect-offline";
import   style from './App.module.css'

import Home from './components/Home/Home'
import CustomerList from './components/CustomerList/CustomerList'
import Header from './components/Header/Header'
import AllTransactions from "./components/AllTransactions/AllTransactions";
import Footer from "./components/Footer/Footer";



function App() {

  return (
    <div id={style.bankingApp}>
      
      <Router>
      <Header/>
      <div id={style.body}>
        <div id={style.content}>
          <Switch>
              <Route exact path="/customerList" component={CustomerList}  />
              <Route exact path="/" component={Home}/>
              <Route exact path="/transactions" component={AllTransactions}/>
              <Redirect to="/"/>
          </Switch>
        </div>
      <Footer />
      </div>
      </Router>  
    </div>
    
  );
}

export default App;
