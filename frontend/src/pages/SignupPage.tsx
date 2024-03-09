import { useContext, useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { useSignupMutation } from "../Hooks/userHooks";

export default function SignupPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const { mutateAsync: signup, isLoading } = useSignupMutation();

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    }
    try {
      const data = await signup({
        name,
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

  <Container className="small-container">
    <Helmet>
      <title>Sign Up</title>
    </Helmet>
    <h1 className="my-3">Sign Up</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control onChange={(e) => setName(e.target.value)} required />
      </Form.Group>

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

      <Form.Group className="mb-3" controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </Form.Group>

      <div className="mb-3">
        <Button type="submit">Sign Up</Button>
      </div>

      <div className="mb-3">
        Already have an account?{" "}
        <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
      </div>
    </Form>
  </Container>;
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
            <title>Sign Up</title>
          </Helmet>
          <div className="justify-content-center row">
            <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-8">
              <div className="card">
                <div
                  className="pt-4 pb-4 text-center card-header"
                  style={{ background: "rgba(114, 124, 245, 1)" }}
                >
                  <div style={{ color: "#fff" }}>
                    <i className="fa fa-user" />
                    <span style={{ marginLeft: "10px" }}>SIGN UP</span>
                  </div>
                </div>
              </div>
              <div className="p-4 card-body bg-white">
                <div
                  className="text-center w-75 m-auto"
                  style={{ color: "#6c757dbf" }}
                >
                  Don't have an account? Create your account, it takes less than
                  a minute.
                </div>
                <Form onSubmit={submitHandler}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </Form.Group>

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

                  <Form.Group className="mb-3" controlId="confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <div className="mb-3 text-center mt-3">
                    <Button
                      disabled={isLoading}
                      type="submit"
                      style={{ background: "rgba(114, 124, 245, 1)" }}
                    >
                      Sign Up
                    </Button>
                    {isLoading && <LoadingBox />}
                  </div>
                  <div
                    className=" text-center mt-3"
                    style={{ color: "#6c757dbf" }}
                  >
                    Already have an account?{" "}
                    <Link
                      to={`/signin?redirect=${redirect}`}
                      style={{
                        textDecoration: "none",
                        fontWeight: 700,
                        color: "#6c757dbf",
                      }}
                      className="ms-1"
                    >
                      Sign In
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
