# Summative-Lab---SPA
This repo contains a Single Page Application (SPA) that uses HTML, CSS, and JavaScript for core functionality

## Project Title

Wordly's First Interactive Digital Dictionary: A dynamic, single-page dictionary that lets users search for words, view definitions, and save favorite terms without page refreshes. Designed for students, writers, and language learners, it provides a fast and user-friendly way to explore and track vocabulary. Integrates seamlessly with Wordly’s language tools.


### API Reference
```
  https://api.dictionaryapi.dev/api/v2/entries/en
```


### Features
Word search : Enables user to search for universally recognized names

Pronunciation audio: Teaches users on correct pronunciation of searched words

Save favorites: Users can save favorite words and jargons for later reference

Error handling: Words that are not available in the dictionary cannot be displayed

Single page experience: No need to refresh, all functionality is on one page

### How it works
Search a word of your choice

Learn the definition of the word and how it is pronounced

Save the word for future reference

#### Usage
Open index.html in your browser.

Enter a word in the search field and click Search.

Click the Play Audio button to hear pronunciation (if available).

Click Save to add the word to your saved words list

#### File Structure
index.html – Contains the search form, results display, audio button and saved words list.

main.js – Handles all the JavaScript logic: fetching from API, displaying results, handling errors, audio playback and saving words. (UX)

styles.css – Styles the SPA for a user-friendly interface (UI)
