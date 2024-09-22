import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

interface Note {
  title: string;
  note: string;
}

interface UserNotesProps {
  notes: Note[];
}

const UserNotes: React.FC<UserNotesProps> = ({ notes }) => {
  if (JSON.stringify(notes) == JSON.stringify(["no results found"])) {
    return <div className="mt-4 mb-4">Take Some Notes!</div>;
  }
  console.log(notes);
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-wrap justify-center -mx-2">
        {notes.map((note, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <Card className="h-[300px] flex flex-col overflow-scroll">
              <Card.Body className="flex flex-col h-[300px]">
                <Card.Title className="text-xl font-bold mb-2 overflow-scroll">
                  {note.title}
                </Card.Title>
                <Card.Text className="flex-grow overflow-scroll">
                  <p>Notes:</p>
                  {note.note
                    .split("-")
                    .map((line) =>
                      line.includes("Notes:") || line.length < 3 ? (
                        <p className="overflow-scroll mb-1"></p>
                      ) : (
                        <p className="overflow-scroll mb-1">-{line}</p>
                      )
                    )}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserNotes;
