import React, { useContext, useEffect } from 'react'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Nav from './components/header/nav/Nav';
import Product from './pages/Product';
import Collection from './pages/Collection';
import Category from './pages/Category';
import Cart from './pages/Cart';
import { SignupContext } from './context/SignupProvider';
import { UserContext } from './context/UserProvider'
import Signup from './components/form/signup/Signup'
import SignIn from './components/form/signin/SignIn';
import Favourite from './components/favourite/Favourite';
import { auth } from './firebaseConfig/firebase.util';
import createUserProfileDocument from './db/create-user-profile-document';

function App() {
  const { isSignIn, handelSignIn, handleUserName } = useContext(SignupContext);
  const { handleSetCurrentUser } = useContext(UserContext);
  useEffect(() => {
    console.log("App.js")
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async user => {
      if (user) {
        const { email, displayName, uid } = user;
        const userAuth = await createUserProfileDocument(uid, { email, displayName });
        if (userAuth) {
          const currentUser = {
            id: uid,
            email,
            displayName: userAuth.displayName
          }
          handleUserName(userAuth.displayName);
          handleSetCurrentUser(currentUser);
          handelSignIn();
        }
        return;
      }
    });
    return () => unsubscribeFromAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={Product} />
            <Route exact path="/collection/:id" component={Collection} />
            <Route exact path="/category/:id" component={Category} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={SignIn} />
            {
              isSignIn ? 
                <Route exact path="/cart" component={Cart} />
                :
                <>
                  <Signup reqRoute="/cart"/>
                </>
          }
          <Route exact path='/my-favourite' component={ isSignIn ? Favourite : SignIn} />
          </Switch>
        </div>
    </Router>
  );
}

export default App;
