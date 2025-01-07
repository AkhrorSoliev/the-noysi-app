import { Form, Link } from "react-router-dom";
import { FormInput } from "../components";
import LoginBg from "../assets/login-bg.jpg";
import Logo from "../assets/noysi.svg";
import { useAuthWithGoogle } from "../hooks/useAuthWithGoogle";

function Login() {
  const { authenticateWithGoogle, isPending } = useAuthWithGoogle();
  return (
    <section
      className="grid h-screen w-full place-items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${LoginBg})`,
      }}
    >
      <div className="align-elements flex w-full max-w-96 flex-col gap-5">
        <div>
          <img src={Logo} alt="site logo" className="mx-auto w-16" />
          <h2 className="text-center text-2xl font-semibold text-white md:text-4xl">
            Login
          </h2>
        </div>
        <Form method="post">
          <FormInput
            label="Email"
            type="email"
            name="email"
            size="input-sm md:input-md"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            size="input-sm md:input-md"
          />
          <div className="mt-5 flex flex-col gap-2 md:flex-row">
            <button className="btn btn-primary btn-sm grow md:btn-md">
              Login
            </button>
            <button
              type="button"
              onClick={authenticateWithGoogle}
              disabled={isPending}
              className="btn btn-secondary btn-sm grow md:btn-md disabled:bg-slate-400"
            >
              {isPending ? "Loading..." : "Google"}
            </button>
          </div>
        </Form>
        <div className="text-center text-white">
          <p>
            if you don't have an account, please{" "}
            <Link to="/signup" className="link link-primary bg-white">
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
