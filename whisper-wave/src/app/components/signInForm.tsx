import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const signInForm = (displayStatus: string) => {
  return (
    <>
      <div className={`${displayStatus} w-50 ml-auto mr-auto`}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Submitted");
            localStorage.setItem("user", "");
          }}
        >
          <FloatingLabel
            controlId="floatingInput"
            label="UserName"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

export default signInForm;
