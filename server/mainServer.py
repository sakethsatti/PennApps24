from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
import librosa
import csv
import io

def csv_to_list(file_path):
    result = []
    try:
        with open(file_path, 'r', newline='') as csvfile:
            csv_reader = csv.reader(csvfile)
            next(csv_reader)
            for row in csv_reader:
                result.append(row[2])
    except FileNotFoundError:
        print(f"Error: File '{file_path}' not found.")
    except csv.Error as e:
        print(f"CSV Error: {e}")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    
    return result

class_names = csv_to_list('yamnet_class_map.csv')

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Load YAMNet model
model = hub.load('https://tfhub.dev/google/yamnet/1')

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and preprocess the audio file
    contents = await file.read()
    with open("output", "wb") as f:
        f.write(contents)

    audio, sr = librosa.load("output", sr=16000, mono=True)
    
    # Make prediction
    scores, embeddings, spectrogram = model(audio)
    class_scores = tf.reduce_mean(scores, axis=0)
    top_classes = tf.argsort(class_scores, direction='DESCENDING')[:3]
    
    # Get class names
    top_class_names = [class_names[i] for i in top_classes.numpy()]
    
    # Prepare results
    results = [{"class": name, "score": float(class_scores[i])} for i, name in zip(top_classes, top_class_names)]
    
    return {"predictions": results}