import React from "react";
import Navbar from "./../components/Navbar";
import IndexPage from "./index";
import AboutPage from "./about";
import FaqPage from "./faq";
import ContactPage from "./contact";
import PricingPage from "./pricing";
import DashboardPage from "./dashboard";
import AuthPage from "./auth";
import SettingsPage from "./settings";
import LegalPage from "./legal";
import { Switch, Route, Router } from "./../util/router";
import PurchasePage from "./purchase";
import FirebaseActionPage from "./firebase-action";
import NotFoundPage from "./404";
import Footer from "./../components/Footer";
import { AuthProvider } from "./../util/auth";
import { ThemeProvider } from "./../util/theme";
import SearchPage from "./search";

function App(props) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <>
            <Navbar
              color="default"
              logo="https://zardslabs.com/wp-content/uploads/2022/03/Zard-Slab-Logo-Horizontal-470-110px.png.webp"
              logoInverted="https://zardslabs.com/wp-content/uploads/2022/03/Zard-Slab-Logo-Horizontal-470-110px.png.webp"
            />

            <Switch>
              <Route exact path="/" component={IndexPage} />

              <Route exact path="/about" component={AboutPage} />

              <Route exact path="/faq" component={FaqPage} />

              <Route exact path="/contact" component={ContactPage} />

              <Route exact path="/pricing" component={PricingPage} />

              <Route exact path="/dashboard" component={DashboardPage} />

              <Route exact path="/auth/:type" component={AuthPage} />

              <Route exact path="/settings/:section" component={SettingsPage} />

              <Route exact path="/legal/:section" component={LegalPage} />

              <Route exact path="/purchase/:plan" component={PurchasePage} />

              <Route exact path="/search" component={SearchPage} />

              <Route
                exact
                path="/firebase-action"
                component={FirebaseActionPage}
              />

              <Route component={NotFoundPage} />
            </Switch>

            <Footer
              bgColor="default"
              size="medium"
              bgImage=""
              bgImageOpacity={1}
              description="The Competitive Edge for Pokemon Card Ecommerce"
              copyright={`© ${new Date().getFullYear()} Company`}
              logo="https://zardslabs.com/wp-content/uploads/2022/03/Zard-Slab-Logo-Horizontal-470-110px.png.webp"
              logoInverted="https://zardslabs.com/wp-content/uploads/2022/03/Zard-Slab-Logo-Horizontal-470-110px.png.webp"
              sticky={true}
            />
          </>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
