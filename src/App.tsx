import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "./components";
import { SearchPage, ShowRatingPage } from "./pages";

const App = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={SearchPage} />
          <Route exact path="/:id" component={ShowRatingPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
