import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchUser } from "./Auth.actions";
import { SERVER_URL } from "../../constants/AppConstants";

let windowObjectReference = null;
let previousUrl = null;
let timer;

export default (props) => {
  const [redirectURL, setRedirectURL] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const urlSearchParams = new URLSearchParams(window.location.search);
  const logout = urlSearchParams.get("logout");

  useEffect(() => {
    axios
      .get(`${SERVER_URL}/auth/google/url`, {
        withCredentials: true
      })
      .then((res) => setRedirectURL(res.data));
    return () => clearInterval(timer);
  }, []);

  useEffect(
    () =>
      logout
        ? history.push("/signin")
        : user &&
          history.push(history.location.pathname.replace("/signin", "") || "/"),
    [user]
  );

  const receiveMessage = (event) => {
    if (event.origin !== SERVER_URL) return;
    dispatch(fetchUser());
  };

  const handleRedirect = () => {
    window.removeEventListener("message", receiveMessage);

    const strWindowFeatures =
      "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(redirectURL, "", strWindowFeatures);
    } else if (previousUrl !== redirectURL) {
      windowObjectReference = window.open(redirectURL, "", strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }

    timer = setInterval(function () {
      if (windowObjectReference.closed) {
        clearInterval(timer);
        receiveMessage({ origin: SERVER_URL });
      }
    }, 1000);

    window.addEventListener("message", (event) => receiveMessage(event), false);
    previousUrl = redirectURL;
  };

  return (
    <Container>
      <Grid
        container
        direction="column"
        rowSpacing={6}
        justifyContent="space-between"
        alignItems="center"
        margin="auto"
        padding={10}
      >
        <GoogleButton style={{ width: "50%" }} onClick={handleRedirect} />
      </Grid>
    </Container>
  );
};
