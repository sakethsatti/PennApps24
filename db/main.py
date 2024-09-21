from pymongo import MongoClient


def write_to_db():
    # Update with your MongoDB connection URI
    client = MongoClient(
        "mongodb+srv://akkubear:WgDHNWXGKxhfw6Mg@usersounds.2xlor.mongodb.net/"
    )
    print("line 9")
    db = client["whisper-wave-ennapps"]
    print(db)
    print("line 11")
    collection = db["userSounds"]

    print("line 13")
    # Insert a document
    doc = {"name": "John Doe", "age": 25, "occupation": "Engineer"}
    print("here")
    result = collection.insert_one(doc)
    print("now")
    print(f"Document inserted with _id: {result.inserted_id}")


if __name__ == "__main__":
    write_to_db()
