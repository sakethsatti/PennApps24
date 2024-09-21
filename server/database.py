from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://akkubear:myPassword_123@usersounds.2xlor.mongodb.net/"
# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi("1"))
# Send a ping to confirm a successful connection
db = client["whisper-wave-pennapps"]  # Your database name
collection = db["users"]  # Your collection name
try:
    client.admin.command("ping")
    doc = {"name": "John Doe", "age": 25, "occupation": "Engineer"}
    result = collection.insert_one(doc)  # Call insert_one on the collection

    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
