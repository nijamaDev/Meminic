import { useAuth0 } from "@auth0/auth0-react";

const Auth0Context = () => {
  const { user, isAuthenticated } = useAuth0();
  return { user, isAuthenticated };
};

export default Auth0Context;
