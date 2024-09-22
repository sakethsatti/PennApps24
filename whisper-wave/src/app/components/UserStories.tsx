import React from "react";
import Card from "react-bootstrap/Card";

interface Note {
  title: string;
  note: string;
}

interface UserNotesProps {
  notes: Note[];
}

const UserNotes: React.FC<UserNotesProps> = ({ notes }) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 ml-auto mr-auto">
      {notes.map((note, index) => (
        <Card key={index}>
          <Card.Body>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>
              <div className="block overflow-auto h-[150px]">{note.note}</div>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UserNotes;
