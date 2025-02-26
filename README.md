# CDP Support Chatbot

A web-based chatbot designed to assist users with "how-to" questions about Customer Data Platforms (CDPs): Segment, mParticle, Lytics, and Zeotap. Built as part of **Assignment 2: Building a Support Agent Chatbot for CDP "How-to" Questions**, this project provides a functional, user-friendly interface with robust question handling and bonus features.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Testing](#testing)
- [Non-Functional Enhancements](#non-functional-enhancements)
- [Potential Improvements](#potential-improvements)

## Overview
This project is a single-page web application built with vanilla HTML, CSS, and JavaScript. It simulates a support chatbot that answers "how-to" questions by fetching mock documentation data (simulating extraction from official CDP documentation URLs: 
- [Segment Docs](https://segment.com/docs/)
- [mParticle Docs](https://docs.mparticle.com/)
- [Lytics Docs](https://docs.lytics.com/)
- [Zeotap Docs](https://docs.zeotap.com/home/en-us/)

It includes advanced features like cross-CDP comparisons and handling of complex queries, emphasizing software engineering principles such as modularity, usability, code quality, and non-functional aspects like security and performance.

The chatbot is designed to be lightweight, accessible, and extensible, making it an excellent prototype for educational purposes or further development into a production-ready tool.

## Features
### Core Functionalities
1. **Answering "How-to" Questions**:
   - Responds to specific queries such as:
     - "How do I set up a new source in Segment?"
     - "How can I create a user profile in mParticle?"
     - "How do I build an audience segment in Lytics?"
     - "How can I integrate my data with Zeotap?"
   - Supports four CDPs: Segment, mParticle, Lytics, and Zeotap.
2. **Documentation Extraction**:
   - Simulates dynamic retrieval of data from official documentation using an asynchronous mock function (`fetchDocs`).
   - Includes references to actual doc URLs for user follow-up.
3. **Question Variation Handling**:
   - Handles oversized questions (>500 characters) with a polite rejection message.
   - Rejects irrelevant questions (e.g., "Which movie is out this week?") with guidance to ask CDP-related "how-to" questions.
   - Normalizes question phrasing using a robust `normalizeTask` function for flexible matching.

### Bonus Features
1. **Cross-CDP Comparisons**:
   - Answers comparative questions like "How does Segment compare to Lytics for audience creation?"
   - Generates a multi-CDP breakdown of approaches.
2. **Advanced "How-to" Questions**:
   - Processes complex queries (e.g., "How do I configure an advanced integration in Zeotap?") with tailored responses.

### User Experience
- **Interface**: Clean, responsive UI with a scrollable chat area.
- **Feedback**: Displays a "Bot is typing..." indicator.
- **Accessibility**: Includes ARIA labels and keyboard support.

## Project Structure
```
cdp-support-chatbot/
├── index.html      # Main HTML structure
├── styles.css      # CSS styling
├── script.js       # JavaScript chatbot logic
├── README.md       # Project documentation
```

## Setup
### Prerequisites
- A modern web browser (e.g., Chrome, Firefox, Edge).
- No external dependencies or server required; runs entirely client-side.
- Git (optional, for cloning the repository).

### Installation
1. **Clone or Download**:
   ```bash
   git clone https://github.com/<your-username>/cdp-support-chatbot.git
   ```
   Replace `<your-username>` with your GitHub username.

2. **Navigate to Directory**:
   ```bash
   cd cdp-support-chatbot
   ```

3. **Run the Application**:
   - Open `index.html` directly in a browser:
     - **Windows**: Double-click `index.html` or run `start index.html`.
     - **Mac/Linux**: Run `open index.html` or drag it into a browser window.

## Usage
1. Open `index.html` in a browser.
2. Type a "how-to" question into the input field (e.g., "How do I set up a new source in Segment?").
3. Click "Send" or press Enter to submit.
4. Read the bot’s response in the chat area.
5. Explore bonus features with questions like:
   - "How does Segment compare to Lytics for audience creation?"
   - "How do I configure an advanced integration in Zeotap?"

## Testing
### Test Cases
- **Basic Queries**: "How do I set up a new source in Segment?" → Should return setup steps.
- **Long Questions**: Enter a question over 500 characters → Should prompt to simplify.
- **Irrelevant Questions**: "Which movie is out this week?" → Should reject with guidance.
- **Comparisons**: "How does Segment compare to Lytics for audience creation?" → Should list approaches for both.
- **Advanced Queries**: "How do I configure an advanced integration in Zeotap?" → Should provide advanced guidance.

### How to Test
- Use a browser’s developer tools (F12) to monitor console logs.
- Test on multiple screen sizes to verify responsiveness.

## Non-Functional Enhancements
### Security
- **Input Sanitization**: Trims and normalizes user input.
- **Dependency-Free**: Built with vanilla JS, avoiding vulnerabilities from external libraries.

### Performance
- **Asynchronous Design**: Uses `async/await` in `fetchDocs`.
- **Efficient DOM Manipulation**: Incremental message appends with smooth scrolling.
- **Lightweight**: No frameworks or heavy assets; initial load is under 10KB.

### Accessibility
- **ARIA Support**: Labels for screen readers.
- **Keyboard Accessibility**: Enter key triggers message sending.

### Usability
- **Typing Indicator**: "Bot is typing..." enhances user experience.
- **Responsive Layout**: Mobile-friendly design.
- **Error Handling**: Provides meaningful feedback for invalid inputs.

## Potential Improvements
- **Real Doc Integration**: Use a Node.js backend with Axios and Cheerio for real documentation retrieval.
- **Chat Persistence**: Save chat history to `localStorage`.
- **Enhanced Security**: Add CSRF tokens and server-side validation.
- **Performance Scaling**: Implement message batching or a virtual DOM for chats with 100+ messages.
- **NLP Upgrade**: Use an NLP tool like Rasa for smarter question parsing.
- **Analytics**: Track user queries for insights.
