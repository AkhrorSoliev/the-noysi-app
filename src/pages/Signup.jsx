import { Form, Link, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { useAuthWithGoogle } from "../hooks/useAuthWithGoogle";

import SignupBg from "../assets/signup-bg.jpg";
import Logo from "../assets/noysi.svg";
import { useEffect } from "react";
import { useSingup } from "../hooks/useSingup";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const displayName = formData.get("displayName");
  const email = formData.get("email");
  const password = formData.get("password");
  return {
    displayName,
    email,
    password,
  };
};

function Signup() {
  const data = useActionData();
  const { signup, isPending: _isPending } = useSingup();
  const { authenticateWithGoogle, isPending } = useAuthWithGoogle();

  useEffect(() => {
    if (data) {
      signup(data.displayName, data.email, data.password);
    }
  }, [data]);

  return (
    <section
      className="grid h-screen w-full place-items-center bg-cover bg-center bg-no-repeat"
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
            <button
              disabled={isPending}
              className="btn btn-primary btn-sm grow md:btn-md"
            >
              {isPending ? "Loading..." : "Login"}
            </button>
            <button
              type="button"
              onClick={authenticateWithGoogle}
              disabled={isPending}
              className="btn btn-secondary btn-sm grow md:btn-md disabled:bg-slate-400"
            >
              {_isPending ? "Loading..." : "Google"}
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
