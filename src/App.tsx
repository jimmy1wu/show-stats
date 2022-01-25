import React from "react";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "./components";
import queryClient from "./lib/react-query";
import SearchPage from "./pages/SearchPage";
import ShowPage from "./pages/ShowPage";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/:imdbID" component={ShowPage} />
          </Switch>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
