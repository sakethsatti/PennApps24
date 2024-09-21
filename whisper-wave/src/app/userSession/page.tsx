import registerForm from "../components/registerForm";

export default function userSession() {
  return (
    <>
      {registerForm(
        localStorage.getItem("username") == null ? "block" : "hidden"
      )}
    </>
  );
}
