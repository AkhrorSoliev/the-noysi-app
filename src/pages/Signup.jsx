import { Form, Link } from "react-router-dom";
import { FormInput } from "../components";
import SignupBg from "../assets/signup-bg.jpg";
import Logo from "../assets/noysi.svg";
import { useAuthWithGoogle } from "../hooks/useAuthWithGoogle";

function Signup() {
  const { authenticateWithGoogle, isPending } = useAuthWithGoogle();

  return (
    <section
      className="grid h-screen place-items-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${SignupBg})`,
      }}
    >
      <div className="align-elements flex w-full max-w-96 flex-col gap-5">
        <div>
          <img src={Logo} alt="site logo" className="mx-auto w-16" />
          <h2 className="text-center text-2xl font-semibold text-white md:text-4xl">
            Signup
          </h2>
        </div>
        <Form method="post">
          <FormInput
            label="Display Name"
            type="text"
            name="displayName"
            size="input-sm md:input-md"
          />
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
              Signup
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
            If you have an account, please{" "}
            <Link to="/login" className="link link-primary bg-white">
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Signup;
