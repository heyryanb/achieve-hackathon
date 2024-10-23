# achieve-hackathon

## Description

This application is a random number generator that displays the result on a spinning wheel with pizza wedges. The user can input the number of total possible results (1-8), and the wheel will spin and stop on the answer. Each wedge of the wheel looks like a piece of pizza with pepperoni and has a number printed on it. The output of the number is known within the application as “result x” and the screen displays “you receive <result x> slices of pizza” once the wheel stops. There is a reset button that brings the user back to the beginning of the program, and a “respin” button that respins with the existing parameters.

## File Structure

```
achieve-hackathon/
│
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
│
├── server.js
├── package.json
└── README.md
```

## Instructions

1. Clone the repository:
   ```
   git clone https://github.com/heyryanb/achieve-hackathon.git
   cd achieve-hackathon
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Start the server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000` to use the application.

5. Input the number of total possible results (1-8) and click the "Spin" button to spin the wheel.

6. The result will be displayed on the screen, and you will see the message “you receive <result x> slices of pizza”.

7. Use the "Reset" button to start over or the "Respin" button to spin the wheel again with the same parameters.
