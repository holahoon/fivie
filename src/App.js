import React, { Component } from "react";
import { Provider } from "./Context";
import "./App.css";

import Header from "./components/Header";
import Navbar from "./components/header_components/Navbar";
import Featuring from "./components/Featuring";
import Footer from "./components/Footer";

class App extends Component {
  // Create Ref
  // myRef = React.createRef();

  // scrollToAbout = () => {
  //   window.scrollTo(0, this.myRef.current.offsetTop);
  // };

  render() {
    return (
      <Provider>
        <React.Fragment>
          <section className="parent">
            <Navbar scrollToAbout={this.scrollToAbout} />
            <Header />
            <Featuring />
            <Footer />
          </section>
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;

// <div>
//   <Switch>
//     <Route exact path="/fivie" component={Index} />
//     <Route exact path="/fivie/info/:id" component={MovieInfo} />
//   </Switch>
// </div>;
