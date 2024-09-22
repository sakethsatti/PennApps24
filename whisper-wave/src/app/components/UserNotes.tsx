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
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="flex flex-wrap justify-center -mx-2">
        {notes.map((note, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <Card className="h-[300px] flex flex-col">
              <Card.Body className="flex flex-col h-full">
                <Card.Title className="text-xl font-bold mb-2 truncate">
                  {note.title}
                </Card.Title>
                <Card.Text className="flex-grow overflow-hidden">
                  <div className="overflow-auto h-[180px] mb-2">
                    {note.note}
                  </div>
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
