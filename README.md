# WhisperWave
by: Saketh Satti (saksatti@gmail.com), Pranshu Suyal(suyalpranshu@gmail.com), and Akshat Tewari (akkubear@gmail.com)
This app was hack for PennApps XXV

Languages: Python, JavaScript
Libraries: React, FastAPI, TensorFlow, OpenAI (Whisper and GPT), PyMongo
Frameworks: NextJS
Database: MongoDB

Resources:
Librosa Docs: https://librosa.org/doc/latest/index.html
MongoDB Docs: https://www.mongodb.com/docs/atlas/
OpenAI Docs: https://platform.openai.com/docs/overview


## Inspiration
At the beginning of the weekend, we tossed around ideas about different apps. We got bored at some point and started discussing family. A lot of our family members seemed to have some sort of hearing loss. At this point, we started to formulate ideas around this topic. We realized that a lot of apps existed to assist individuals with hearing loss. What if we could combine a bunch of different applications into one? 

## What it does
The app requires the user to create an account before doing anything. When logged in, the user is introduced to three separate features. 

1. Sound Classification Page - Here the user can record sound or upload a recording. The website reports back to the user and tells them what might have made that sound.
2. Storytelling - Alright, this feature is just for entertainment! Based on the last few sounds that were detected and stored in MongoDB Atlas, we have GPT4o generate a story under a certain theme that the user selects. Themes include: funny, serious, and sad.
3. Notetaking - For deaf students, taking notes during lectures could be quite difficult. This feature allows the student to instead record the entire lecture and come up with genuinely useful notes in bulleted form.

## How we built it

We used NextJS in Javascript to build the UI of the website. The backend of the website was managed by FastAPI server build with Python. The frontend made API calls to the backend for signing/register the user and for the audio classification model (YAMNet). For the language models and speech to text, the frontend directly OpenAI API. All data including usernames, passwords, audio recordings, and audio classifications were all stored in MongoDB Atlas. We connected to the MongoDB database through PyMongo on the FastAPI server. 

## Challenges we ran into

The biggest challenge we ran into had to do with handling the database. Due to finicky internet connections and relative inexperience with MongoDB Atlas (we're used to Firebase), it took us a while to configure the database. Working through these bugs took countless hours of reading documentation and hacking. But when we did, it was a HUGE relief.

While difficult at first, we managed to configure communication between the OpenAI API and our own website. 

## Accomplishments that we're proud of

We all had experience in different parts of software engineering. Seeing the frontend, backend, AI, and numerous moving parts come together as one seamless web application is something that we're really proud about.

The goal of this project was to engineering something genuinely useful – something that people would actually use. While we can't say for sure, we think this hack could improve the quality of life for many individuals suffering from hearing loss. That includes our family members.

## What we learned

Of course, it took A LOT of learning to make this app. We used technologies that we barely understood just two days ago and put together and fully functional app.

It's not just that, though. It took understanding the problems that millions of people face everyday and trying to accommodate them. 

## What's next for WhisperWave

Again, WhisperWave is meant to be a "toolkit for the deaf." In practice, this means we keep adding to the website to assist deaf people in their day to day lives. It is our hope to continually add more and more features including sign-language translation, emotion detection, and even voice controls.

Additionally, to make this website more accessible, we want to transform this website into an mobile app. Although the website works seamlessly on mobile browsers, the ability to have a app would greatly enhance the accessibility and personalization of our technology.
