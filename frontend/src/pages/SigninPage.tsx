import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingBox from "../components/LoadingBox";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { useSigninMutation } from "../Hooks/userHooks";
import { hideFooter, hideHeader } from "../App";

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  hideFooter()
  hideHeader()
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const { mutateAsync: signin, isLoading } = useSigninMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const data = await signin({
        email,
        password,
      });
      dispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <>
      <div
        className="position-absolute start-0 bottom-0 top-0 end-0 w-100 h-100"
        style={{ zIndex: -1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 800 800"
        >
          <g fill-opacity="0.22">
            <circle
              cx="400"
              cy="400"
              r="600"
              style={{ fill: "rgba(114, 124, 245, 0.1)" }}
            ></circle>
            <circle
              cx="400"
              cy="400"
              r="500"
              style={{ fill: "rgba(114, 124, 245, 0.2)" }}
            ></circle>
            <circle
              cx="400"
              cy="400"
              r="300"
              style={{ fill: "rgba(114, 124, 245, 0.3)" }}
            ></circle>
            <circle
              cx="400"
              cy="400"
              r="200"
              style={{ fill: "rgba(114, 124, 245, 0.4)" }}
            ></circle>
            <circle
              cx="400"
              cy="400"
              r="100"
              style={{ fill: "rgba(114, 124, 245, 0.5)" }}
            ></circle>
          </g>
        </svg>
      </div>
      <div className="d-flex align-items-center">
        <Container className="small-container">
          <Helmet>
            <title>Sign In</title>
          </Helmet>
          <div className="justify-content-center row">
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8" style={{position: "absolute", top: "20%"}}>
              <div className="card">
                <div
                  className="pt-4 pb-4 text-center card-header"
                  style={{ background: "rgba(114, 124, 245, 1)" }}
                >
                  <div style={{ color: "#fff" }}>
                    <i className="fa fa-user" />
                    <span style={{ marginLeft: "10px" }}>SIGN IN</span>
                  </div>
                </div>
              </div>
              <div className="p-4 card-body bg-white">
                <div
                  className="text-center w-75 m-auto"
                  style={{ color: "#6c757dbf" }}
                >
                  Enter your username and password to access admin panel.
                </div>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mb-3 text-center mt-3">
                    <Button
                      disabled={isLoading}
                      type="submit"
                      style={{
                        background: "rgba(114, 124, 245, 1)",
                        boxShadow: "0px 2px 6px 0px rgba(114, 124, 245, 0.5)",
                        border: "none",
                      }}
                    >
                      Log in
                    </Button>
                    {isLoading && <LoadingBox />}
                  </div>
                  <div
                    className="mb-3 text-center mt-3"
                    style={{ color: "#6c757dbf" }}
                  >
                    New customer?{" "}
                    <Link
                      to={`/signup?redirect=${redirect}`}
                      style={{
                        textDecoration: "none",
                        fontWeight: 700,
                        color: "#6c757dbf",
                      }}
                      className="ms-1"
                    >
                      Create your account
                    </Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
