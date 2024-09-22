import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const createUserNotes = (notebook: any) => {
  console.log(notebook.title);
  console.log(notebook.note);
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{notebook.title}</Card.Title>
          <Card.Text>
            <div className="block overflow-auto h-[150px]">{notebook.note}</div>
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default createUserNotes;
