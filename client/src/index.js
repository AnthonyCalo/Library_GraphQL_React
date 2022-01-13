import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {createNetworkInterface} from "apollo-client";
import {ApolloProvider} from 'react-apollo';
import {Router, Route, hashHistory, IndexRoute} from "react-router";
import App from "./App";
import LoginForm from './components/LoginForm';
import RegisterForm from './components/registerform';
import SearchPage from './components/SearchPage';
import BookShelf from './components/BookShelf';
import ReadingList from './components/ReadingList';
import BookDetail from "./components/BookDetail";
import HomePage from "./components/HomePage";
import requireAuth from './components/requireAuth';


const networkInterface=createNetworkInterface({
    uri: "/graphql",
    opts:{
      credentials: "include",
    }
  })
const client = new ApolloClient({
    networkInterface,
    dataIdFromObject: o =>o.id
});

const Root = () => {

  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <Route exact path="/search" component={SearchPage} />
          <Route exact path="/myShelf" component={requireAuth(BookShelf)} />
          <Route exact path="/myList" component={requireAuth(ReadingList)} />
          <Route exact path="/book/:id" component={requireAuth(BookDetail)} />
        </Route>
      </Router>
    </ApolloProvider>
    )
  }

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);