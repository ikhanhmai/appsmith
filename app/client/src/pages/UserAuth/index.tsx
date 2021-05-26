import React from "react";
import { Route, Switch, useLocation, useRouteMatch } from "react-router-dom";
import Login from "./Login";
import { AuthCard, AuthCardContainer, AuthContainer } from "./StyledComponents";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import PageNotFound from "pages/common/PageNotFound";
import FooterLinks from "./FooterLinks";
import * as Sentry from "@sentry/react";
import requiresAuthHOC from "./requiresAuthHOC";
import { useSelector } from "react-redux";
import { getThemeDetails, ThemeMode } from "selectors/themeSelectors";
import { AppState } from "reducers";
import { ThemeProvider } from "styled-components";
import { getAppsmithConfigs } from "configs";
import { useScript, ScriptStatus, AddScriptTo } from "utils/hooks/useScript";

const SentryRoute = Sentry.withSentryRouting(Route);
const { googleRecaptchaSiteKey } = getAppsmithConfigs();
export function UserAuth() {
  const { path } = useRouteMatch();
  const location = useLocation();
  const darkTheme = useSelector((state: AppState) =>
    getThemeDetails(state, ThemeMode.DARK),
  );

  const status = useScript(
    `https://www.google.com/recaptcha/api.js?render=${googleRecaptchaSiteKey}`,
    AddScriptTo.HEAD,
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <AuthContainer>
        {status === ScriptStatus.READY && (
          <AuthCardContainer>
            <AuthCard>
              <Switch location={location}>
                <SentryRoute component={Login} exact path={`${path}/login`} />
                <SentryRoute component={SignUp} exact path={`${path}/signup`} />
                <SentryRoute
                  component={ResetPassword}
                  exact
                  path={`${path}/resetPassword`}
                />
                <SentryRoute
                  component={ForgotPassword}
                  exact
                  path={`${path}/forgotPassword`}
                />
                <SentryRoute component={PageNotFound} />
              </Switch>
            </AuthCard>
          </AuthCardContainer>
        )}
        <FooterLinks />
      </AuthContainer>
    </ThemeProvider>
  );
}

export default requiresAuthHOC(UserAuth);
