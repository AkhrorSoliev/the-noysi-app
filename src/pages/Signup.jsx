import { Form, Link } from "react-router-dom";
import { FormInput } from "../components";
import SignupBg from "../assets/signup-bg.jpg";

function Signup() {
  return (
    <section
      className={`grid h-screen place-items-center bg-cover bg-center bg-no-repeat`}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${SignupBg})`,
      }}
    >
      <div className="align-elements flex w-full max-w-96 flex-col gap-5">
        <h2 className="text-center text-2xl font-semibold text-white md:text-4xl">
          Signup
        </h2>
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
            <button className="btn btn-secondary btn-sm grow md:btn-md">
              Google
            </button>
          </div>
        </Form>
        <div className="text-center text-white">
          <p>
            if you have an account, please{" "}
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
