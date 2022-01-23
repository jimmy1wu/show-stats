import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Header } from "./components";
import queryClient from "./lib/queryClient";
import SearchPage from "./pages/SearchPage";
import ShowRatingPage from "./pages/ShowRatingPage";

const App = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/:id" component={ShowRatingPage} />
          </Switch>
        </BrowserRouter>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};

export default App;
