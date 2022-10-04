import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import Auth from "../components/auth/Auth";
import AuthContext from "../components/auth/AuthContext";
import LoginPage from "../LoginPage";
import App from "../App";
import { Provider } from "react-redux";
import { store } from "../../store/store";
afterEach(() => {
  cleanup();
});
test("check login button enabled", async () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <AuthContext.Provider value={{ user: null, authenticated: false }}>
          <LoginPage />
        </AuthContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
  const loginButton = await screen.findByRole("button", { name: /login/i });
  expect(loginButton).toBeEnabled();
});

test("check auth loading", async () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <Auth>
          <LoginPage />
        </Auth>
      </HelmetProvider>
    </BrowserRouter>
  );
  const loading = await screen.findByText("Loading...");
  expect(loading).toBeInTheDocument();
});

test("check login validation empty input field", async () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <AuthContext.Provider value={{ user: null, authenticated: false }}>
          <LoginPage />
        </AuthContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
  const loginButton = await screen.findByRole("button", { name: /login/i });
  fireEvent.click(loginButton);
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /login/i })).toHaveAttribute(
      "disabled"
    );
  });
  expect(screen.getByText("Email is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
});

test("check login email validation", async () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <AuthContext.Provider value={{ user: null, authenticated: false }}>
          <LoginPage />
        </AuthContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
  const loginButton = await screen.findByPlaceholderText("Email");
  loginButton.focus();
  fireEvent.change(loginButton, { target: { value: "example.com" } });
  const password = await screen.findByPlaceholderText("Password");
  await waitFor(() => {
    password.focus();
    expect(screen.getByText("Email must be valid")).toBeInTheDocument();
  });
});

test("check login password validation", async () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <AuthContext.Provider value={{ user: null, authenticated: false }}>
          <LoginPage />
        </AuthContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
  const loginButton = await screen.findByPlaceholderText("Email");
  fireEvent.change(loginButton, { target: { value: "example@email.com" } });
  const password = await screen.findByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "1234567" } });
  password.focus();
  await waitFor(() => {
    loginButton.focus();
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });
});

test("go to registration from login page", async () => {
  render(
    <BrowserRouter>
      <HelmetProvider>
        <AuthContext.Provider value={{ user: null, authenticated: false }}>
          <Provider store={store}>
            <App />
          </Provider>
        </AuthContext.Provider>
      </HelmetProvider>
    </BrowserRouter>
  );
  const signupButton = await screen.findByRole("link", { name: /sign up/i });
  fireEvent.click(signupButton);
  expect(await screen.findByText("Sign Up to E-Learning")).toBeInTheDocument();
});
