import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../store/store";
import App from "../App";
import AuthContext from "../components/auth/AuthContext";
import RegistrationPage from "../RegistrationPage";
afterEach(() => {
  cleanup();
});
test("check registration button enabled", async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user: null, authenticated: false }}>
        <Provider store={store}>
          <HelmetProvider>
            <RegistrationPage />
          </HelmetProvider>
        </Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const registerButton = await screen.findByRole("button", {
    name: /Register/i,
  });
  expect(registerButton).toBeEnabled();
});

test("check registration validation empty input field", async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user: null, authenticated: false }}>
        <Provider store={store}>
          <HelmetProvider>
            <RegistrationPage />
          </HelmetProvider>
        </Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const registerButton = await screen.findByRole("button", {
    name: /Register/i,
  });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(screen.getByRole("button", { name: /register/i })).toHaveAttribute(
      "disabled"
    );
  });
  expect(screen.getByText("Name is required")).toBeInTheDocument();
  expect(screen.getByText("Email is required")).toBeInTheDocument();
  expect(screen.getByText("Password is required")).toBeInTheDocument();
  expect(screen.getByText("Repeat Password is required")).toBeInTheDocument();
});

test("check registration email validation", async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user: null, authenticated: false }}>
        <Provider store={store}>
          <HelmetProvider>
            <RegistrationPage />
          </HelmetProvider>
        </Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const registerButton = await screen.findByRole("button", {
    name: /Register/i,
  });
  const emailInput = await screen.findByPlaceholderText("Email");
  fireEvent.change(emailInput, { target: { value: "example.com" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(screen.getByText("Email must be valid")).toBeInTheDocument();
  });
});

test("check registration password validation", async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user: null, authenticated: false }}>
        <Provider store={store}>
          <HelmetProvider>
            <RegistrationPage />
          </HelmetProvider>
        </Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const registerButton = await screen.findByRole("button", {
    name: /Register/i,
  });
  const passwordInput = await screen.findByPlaceholderText("Password");
  fireEvent.change(passwordInput, { target: { value: "1234567" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(
      screen.getByText("Password must be at least 8 characters")
    ).toBeInTheDocument();
  });
});

test("check registration match password validation", async () => {
  render(
    <BrowserRouter>
      <AuthContext.Provider value={{ user: null, authenticated: false }}>
        <Provider store={store}>
          <HelmetProvider>
            <RegistrationPage />
          </HelmetProvider>
        </Provider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
  const registerButton = await screen.findByRole("button", {
    name: /Register/i,
  });
  const passwordInput = await screen.findByPlaceholderText("Password");
  const repeatPasswordInput = await screen.findByPlaceholderText(
    "Repeat Password"
  );
  fireEvent.change(passwordInput, { target: { value: "12345678" } });
  fireEvent.change(repeatPasswordInput, { target: { value: "123456798" } });
  fireEvent.click(registerButton);
  await waitFor(() => {
    expect(screen.getByText("Password must match")).toBeInTheDocument();
  });
});

test("go to login from registration page", async () => {
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
  const loginButton = await screen.findByRole("link", { name: /sign up/i });
  fireEvent.click(loginButton);
  const signupButton = await screen.findByRole("link", { name: /login/i });
  fireEvent.click(signupButton);
  expect(await screen.findByText("Sign in to E-Learning")).toBeInTheDocument();
});
