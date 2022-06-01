import supabase from "../utils/supabase";

export function getStaticProps() {
  return {
    props: {},
  };
}

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;

    try {
      await supabase.auth.signIn({ email });
      console.log("Successful!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input style={{ marginLeft: "5px" }} type="text" name="email" />
        </label>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
