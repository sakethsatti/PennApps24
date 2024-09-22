import React from "react";
import Card from "react-bootstrap/Card";

interface Story {
  tone: string;
  story: string;
}

interface UserStoriesProps {
  stories: Story[];
}

const UserStories: React.FC<UserStoriesProps> = ({ stories }) => {
  return (
    <div className="flex justify-center items-center p-4">
      <div className="flex flex-wrap justify-center max-w-6xl w-full">
        {stories.map((story, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-2">
            <Card className="h-full">
              <Card.Body className="flex flex-col h-full">
                <Card.Title className="text-xl font-bold mb-2">
                  Tone:{" "}
                  <span
                    className={
                      story.tone == "sad"
                        ? "text-sky-400 font-bold"
                        : story.tone == "funny"
                        ? "text-yellow-400 font-bold"
                        : "text-red-900 font-bold"
                    }
                  >
                    {story.tone.charAt(0).toUpperCase() + story.tone.slice(1)}
                  </span>
                </Card.Title>
                <Card.Text className="flex-grow overflow-hidden">
                  <div className="overflow-auto h-[150px]">{story.story}</div>
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStories;
