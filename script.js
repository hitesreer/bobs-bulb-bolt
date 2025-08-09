
// STARTING SCENE WITH BOB AND HIS IDEA CRISIS (GIVES CONTEXT TO GAME)

let bobX, bobY;
let bookcaseBooks = [];
let mouthOpen = 0;

let speechIndex = 0;
const speeches = [
  "HELP MEEEEE. I need ideas quickly. My project is due in 2 weeks and I need an idea NOWWWWWWWW!",
  "I have no hope for a good grade now! It's literally the end of the world!!!",
  "WAIT!",
  "There is ONE way you can help me.",
  "I can use my mother's shrink ray to make you small enough to enter my brain.",
  "I know I have ideas in my brain. I just need you to find them.",
  "Please help me. I am so stressed out. You'll help me right?",
];

let nextBtn, yesBtn, noBtn;
let waitingForAnswer = false;
let noClicked = false;
let noClickedTime = 0;

function setup() {
  createCanvas(600, 400);
  bobX = width / 2;
  bobY = height * 0.6;
  generateBookcaseBooks();

  // Create Next button
  nextBtn = createButton('Next');
  nextBtn.position(width - 80, height - 40);
  nextBtn.mousePressed(nextSpeech);

  // Create Yes button (hidden initially)
  yesBtn = createButton('Yes');
  yesBtn.position(width - 140, height - 40);
  yesBtn.mousePressed(() => {
    yesBtn.hide();
    noBtn.hide();
    shrinkFlyRules();
  });
  yesBtn.hide();

  // Create No button (hidden initially)
  noBtn = createButton('No');
  noBtn.position(width - 80, height - 40);
  noBtn.mousePressed(() => {
    noClicked = true;
    waitingForAnswer = false;
    noClickedTime = millis();
    yesBtn.hide();
    noBtn.hide();
  });
  noBtn.hide();
}

function nextSpeech() {
  if (waitingForAnswer) return; // block next if waiting for answer

  speechIndex++;
  if (speechIndex >= speeches.length) {
    // End of speeches, show Yes/No buttons and hide Next button
    speechIndex = speeches.length - 1; // stay on last speech until choice made
    waitingForAnswer = true;
    nextBtn.hide();
    yesBtn.show();
    noBtn.show();
    return;
  }
}

function draw() {
  background(220, 230, 255);

  drawRoom();
  drawBookcase();
  drawChair();
  drawBob(bobX, bobY);
  drawDesk();
  drawStressText();

  // Show speech bubble message
  if (noClicked) {
    drawSpeechBubbleCloud(470, 250, 220, 100, "Too bad, you're doing this!");

    // Check if 3 seconds have passed since No was clicked
    if (millis() - noClickedTime >= 3000) {
      shrinkFlyRules();
    }
  } else {
    drawSpeechBubbleCloud(470, 250, 220, 100, speeches[speechIndex]);
  }

  animateMouth();
}

function drawRoom() {
  noStroke();
  fill(200, 180, 150);
  rect(0, height * 0.75, width, height * 0.25);

  fill(150, 220, 255);
  rect(width - 150, 50, 100, 80);
  stroke(255);
  line(width - 150, 90, width - 50, 90);
  line(width - 100, 50, width - 100, 130);
  noStroke();
}

function drawBookcase() {
  let x = 50;
  let y = 70;
  let w = 120;
  let h = 250;

  fill(150, 100, 50);
  rect(x, y, w, h, 10);

  fill(130, 80, 40);
  rect(x + 5, y + 5, w - 10, h - 10, 8);

  fill(110, 70, 30);
  for (let i = 0; i < 5; i++) {
    let shelfY = y + 10 + i * 50;
    rect(x + 5, shelfY, w - 10, 6);
  }

  for (let book of bookcaseBooks) {
    fill(book.color);
    rect(book.x, book.y, book.w, book.h, 2);
  }
}

function generateBookcaseBooks() {
  let x = 50;
  let y = 70;
  let w = 120;
  let colors = [
    '#c0392b', '#2980b9', '#27ae60', '#f39c12',
    '#8e44ad', '#d35400', '#2c3e50', '#7f8c8d',
    '#16a085', '#e67e22'
  ];

  for (let shelf = 0; shelf < 5; shelf++) {
    let shelfY = y + 15 + shelf * 50;
    let bookX = x + 10;
    while (bookX < x + w - 15) {
      let bookW = random(10, 18);
      let bookH = random(30, 40);
      let c = random(colors);
      bookcaseBooks.push({
        x: bookX,
        y: shelfY + (40 - bookH),
        w: bookW,
        h: bookH,
        color: c
      });
      bookX += bookW + 4;
    }
  }
}

function drawDesk() {
  fill(139, 69, 19);
  rect(bobX - 110, bobY + 40, 220, 50, 10);
  rect(bobX - 110, bobY + 90, 25, 70, 5);
  rect(bobX + 85, bobY + 90, 25, 70, 5);
}

function drawChair() {
  fill(100, 60, 30);
  rect(bobX - 45, bobY + 90, 90, 20, 8);
  rect(bobX - 50, bobY - 20, 100, 70, 15);
}

function drawBob(x, y) {
  fill(50, 70, 100);
  rect(x - 30, y + 80, 25, 50, 12);
  rect(x + 5, y + 80, 25, 50, 12);

  fill(80, 40, 20);
  ellipse(x - 18, y + 130, 35, 20);
  ellipse(x + 18, y + 130, 35, 20);

  fill(0, 150, 255);
  rect(x - 40, y - 20, 80, 90, 25);

  fill(255, 220, 180);
  rect(x - 10, y - 40, 20, 15, 6);

  fill(255, 220, 180);
  ellipse(x, y - 75, 90, 100);

  fill(255);
  ellipse(x - 20, y - 80, 25, 18);
  ellipse(x + 20, y - 80, 25, 18);
  fill(0);
  ellipse(x - 20, y - 80, 12, 12);
  ellipse(x + 20, y - 80, 12, 12);
  fill(255);
  ellipse(x - 24, y - 84, 6, 6);
  ellipse(x + 16, y - 84, 6, 6);

  // Realistic animated mouth
  fill(0);
  noStroke();
  let mouthW = map(mouthOpen, 0, 40, 2, 16);
  let mouthH = map(mouthOpen, 0, 40, 2, 20);
  ellipse(x, y - 55, mouthW, mouthH);

  strokeWeight(4);
  stroke(0);
  line(x - 35, y - 105, x - 15, y - 115);
  line(x + 15, y - 115, x + 35, y - 105);
  noStroke();

  fill(255, 220, 180);
  push();
  translate(x - 40, y - 10);
  rotate(radians(-45));
  rect(0, 0, 15, 60, 10);
  pop();

  push();
  translate(x + 25, y - 10);
  rotate(radians(45));
  rect(0, 0, 15, 60, 10);
  pop();
}

function drawStressText() {
  fill(0);
  textSize(18);
  textAlign(CENTER);
  text("Bob's stressing over his programming project idea...", width / 2, 30);
  text("Sitting at home by his desk with no inspiration.", width / 2, 55);
}

function animateMouth() {
  if (frameCount % 5 === 0) {
    if (random() < 0.8) {
      mouthOpen = int(random(25, 40));
    } else {
      mouthOpen = int(random(0, 5));
    }
  }
}

function drawSpeechBubbleCloud(x, y, w, h, msg) {
  // Redefine variables (you can remove this if you want)
  x = 470;
  y = 250;
  w = 220;
  h = 100;

  push();
  fill(255);
  stroke(0);
  strokeWeight(2);

  // Main cloud body with overlapping circles
  ellipse(x, y, w, h);

  // Tail of the bubble
  ellipse(x - 80, y - 45, 20, 20);
  ellipse(x - 95, y - 65, 15, 15);
  ellipse(x - 115, y - 80, 10, 10);

  // Text inside bubble
  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text(msg, x - 80, y , w - 70);

  pop();
}

//SHRINKING AND FLYING ANIMATION WHICH THEN LEADS INSTRUCTION SCREEN FOR MAZE GAME

// Global variables for shrink animation
let shrinkGirlX, shrinkGirlY;
let shrinkMouthOpen = 30;
let sceneState = "waitingToShrink";
let shrinkProgress = 0;
let shrinkSpeed = 0.01;
let girlVisible = true;
let ufoX = 500;
let ufoY = 300;
let shrinkStartTime;
let ufoFlyStartTime;
let enterBrainButton;
let enterMazeButton;
let showEnterBrainButton = false;
let showTVScreen = false;
let tvAnimationProgress = 0;

function shrinkFlyRules() {
  // Hide the current buttons
  if (nextBtn) nextBtn.hide();
  if (yesBtn) yesBtn.hide();
  if (noBtn) noBtn.hide();

  // Initialize shrink scene
  shrinkGirlX = width / 2;
  shrinkGirlY = height * 0.6;
  // Clear existing books and regenerate for shrink scene
  bookcaseBooks = [];
  generateBookcaseBooks();
  shrinkStartTime = millis();

  // Create button but hide initially
  enterBrainButton = createButton('Enter the brain');
  enterBrainButton.position(width / 2 - 60, height / 2 + 50);
  enterBrainButton.style('font-size', '18px');
  enterBrainButton.style('padding', '10px 20px');
  enterBrainButton.style('background-color', '0');
  enterBrainButton.mousePressed(onEnterBrainPressed);
  enterBrainButton.hide();

  // Create Enter Maze button
  enterMazeButton = createButton('Enter Maze');
  enterMazeButton.style('font-size', '16px');
  enterMazeButton.style('padding', '8px 16px');
  enterMazeButton.style('background-color', '#444');
  enterMazeButton.style('color', '#fff');
  enterMazeButton.mousePressed(onEnterMazePressed);
  enterMazeButton.hide();

  // Override the draw function for shrink scene
  window.draw = shrinkDraw;
}

function shrinkDraw() {
  background(220, 230, 255);

  if (showTVScreen) {
    drawTVScreen();
  } else {
    drawShrinkRoom();
    drawShrinkBookcase();

    // Shrinking effect
    push();
    let scaleAmount = 1 - shrinkProgress * 0.8;
    translate(shrinkGirlX, shrinkGirlY + 100);
    scale(scaleAmount);
    translate(-shrinkGirlX, -(shrinkGirlY + 100));
    if (girlVisible) drawGirl(shrinkGirlX, shrinkGirlY);
    pop();

    // Scene progression logic
    if (sceneState === "waitingToShrink") {
      if (millis() - shrinkStartTime >= 2000) {
        sceneState = "shrinking";
      }
    } else if (sceneState === "shrinking") {
      if (shrinkProgress < 1) {
        shrinkProgress += shrinkSpeed;
      } else {
        sceneState = "waitingAfterShrink";
        setTimeout(() => {
          sceneState = "walking";
        }, 2000);
      }
    } else if (sceneState === "walking") {
      shrinkGirlX += 1.5;
      if (shrinkGirlX > ufoX - 30) {
        girlVisible = false;
        sceneState = "beamed";
        setTimeout(() => {
          ufoFlyStartTime = millis();
          sceneState = "flyingUp";
        }, 500);
      }
    } else if (sceneState === "flyingUp") {
      ufoY -= 2;
      if (ufoY <= 187) {  // Stop at 3/4 the height (3/4 of 250 = 187.5, rounded to 187)
        sceneState = "flyingRight";
      }
    } else if (sceneState === "flyingRight") {
      ufoX += 4;
      if (ufoX > width + 100) {
        showEnterBrainButton = true;
        enterBrainButton.show();
        sceneState = "ended";
      }
    }

    drawYouText();
    drawUFO(ufoX, ufoY);

    // Show shrink ray effect during shrinking phase
    if (sceneState === "shrinking") {
      drawZapSquiggle(shrinkGirlX, shrinkGirlY - 20, shrinkProgress);
    }
  }
}

function onEnterBrainPressed() {
  showEnterBrainButton = false;
  enterBrainButton.hide();
  showTVScreen = true;
  tvAnimationProgress = 0;
}

function onEnterMazePressed() {
  console.log("Maze game starting...");
  enterMazeButton.hide();
  mazeCode();
}

function drawTVScreen() {
  background(20, 20, 40);

  // Draw TV shape
  push();
  translate(width / 2, height / 2);
  fill(30);
  stroke(255);
  strokeWeight(6);
  rectMode(CENTER);
  rect(0, 0, 480, 350, 20);

  // Screen area inside TV
  fill(10, 10, 50);
  noStroke();
  rect(0, 0, 450, 320, 15);
  pop();

  // Animated text appear (typewriter style)
  let fullText = [
    "Rules of the next stage:\n",
    "- Get the bulb to the flag before time runs out.",
    "- Use arrow keys to move.",
    "- You have 3 chances to succeed.",
    "- Maze changes each time you fail.",
    "- You have 60 seconds to restore Bob's hope.",
  "- Avoid hitting distraction squares as it\n  decreases time by 5 seconds.",
    "- Press R to restart.\n",
    "Good luck!"
  ];

  let totalChars = tvAnimationProgress;
  let displayText = "";
  for (let line of fullText) {
    if (totalChars >= line.length) {
      displayText += line + "\n";
      totalChars -= line.length;
    } else if (totalChars > 0) {
      displayText += line.substring(0, totalChars) + "\n";
      totalChars = 0;
    } else {
      break;
    }
  }

  fill(180, 220, 255);
  textSize(18);
  textAlign(LEFT, TOP);
  text(displayText, width / 2 - 180, height / 2 - 120);

  // Progress animation
  if (tvAnimationProgress < fullText.join("\n").length) {
    tvAnimationProgress += 1;
  } else {
    // Show Enter Maze button when typing is done
    enterMazeButton.position(
      width / 2 + 450 / 2 - 120,
      height / 2 + 320 / 2 - 40
    );
    enterMazeButton.show();
  }
}



function drawUFO(x, y) {
  push();
  translate(x, y);
  scale(0.4);

  fill(180);
  stroke(50);
  strokeWeight(3);
  ellipse(0, 0, 160, 70);

  fill(255, 200, 50);
  stroke(100, 80, 0);
  strokeWeight(2);
  let lightCount = 6;
  for (let i = 0; i < lightCount; i++) {
    let angle = map(i, 0, lightCount - 1, -PI / 2, PI / 2);
    let lx = cos(angle) * 70;
    let ly = sin(angle) * 10;
    ellipse(lx, ly + 10, 20, 15);
  }

  fill(100, 220, 255, 200);
  stroke(30, 150, 200);
  strokeWeight(3);
  ellipse(0, -25, 100, 70);

  noStroke();
  fill(255, 255, 255, 100);
  ellipse(-20, -40, 30, 15);

  stroke(50);
  strokeWeight(4);
  fill(120);
  let legLength = 30;
  let legYStart = 35;

  push();
  translate(-40, legYStart);
  rotate(radians(20));
  line(0, 0, 0, legLength);
  ellipse(0, legLength + 5, 15, 8);
  pop();

  push();
  translate(40, legYStart);
  rotate(radians(-20));
  line(0, 0, 0, legLength);
  ellipse(0, legLength + 5, 15, 8);
  pop();

  pop();
}

function drawShrinkRoom() {
  noStroke();
  fill(200, 180, 150);
  rect(0, height * 0.75, width, height * 0.25);
  fill(150, 220, 255);
  rect(width - 150, 50, 100, 80);
  stroke(255);
  line(width - 150, 90, width - 50, 90);
  line(width - 100, 50, width - 100, 130);
  noStroke();
}

function drawShrinkBookcase() {
  let x = 50;
  let y = 70;
  let w = 120;
  let h = 250;

  fill(150, 100, 50);
  rect(x, y, w, h, 10);

  fill(130, 80, 40);
  rect(x + 5, y + 5, w - 10, h - 10, 8);

  fill(110, 70, 30);
  for (let i = 0; i < 5; i++) {
    let shelfY = y + 10 + i * 50;
    rect(x + 5, shelfY, w - 10, 6);
  }

  for (let book of bookcaseBooks) {
    fill(book.color);
    rect(book.x, book.y, book.w, book.h, 2);
  }
}

function drawGirl(x, y) {
  fill(180, 110, 130);
  rect(x - 30, y, 25, 100, 12);
  rect(x + 5, y, 25, 100, 12);

  fill(140, 90, 70);
  ellipse(x - 18, y + 100, 35, 20);
  ellipse(x + 18, y + 100, 35, 20);

  fill(200, 150, 220);
  beginShape();
  vertex(x - 40, y + 120);
  bezierVertex(x - 60, y + 20, x - 30, y - 40, x, y - 40);
  bezierVertex(x + 30, y - 40, x + 60, y + 20, x + 60, y + 120);
  endShape(CLOSE);

  fill(180, 130, 200);
  rect(x - 25, y - 50, 50, 50, 10);

  fill(255, 220, 200);
  rect(x - 10, y - 65, 20, 20, 6);

  push();
  noStroke();
  fill(100, 50, 40);
  beginShape();
  vertex(x - 45, y - 120);
  bezierVertex(x - 65, y - 125, x - 60, y - 40, x - 45, y - 25);
  bezierVertex(x - 43, y - 70, x - 43, y - 120, x - 45, y - 120);
  endShape(CLOSE);

  beginShape();
  vertex(x + 45, y - 120);
  bezierVertex(x + 65, y - 125, x + 60, y - 40, x + 45, y - 25);
  bezierVertex(x + 43, y - 70, x + 43, y - 120, x + 45, y - 120);
  endShape(CLOSE);
  ellipse(x, y - 145, 110, 90);
  fill(80, 40, 30);
  ellipse(x, y - 120, 90, 70);
  pop();

  fill(255, 220, 200);
  ellipse(x, y - 110, 90, 100);

  fill(255);
  ellipse(x - 20, y - 115, 25, 18);
  ellipse(x + 20, y - 115, 25, 18);
  fill(0);
  ellipse(x - 20, y - 115, 12, 12);
  ellipse(x + 20, y - 115, 12, 12);
  fill(255);
  ellipse(x - 24, y - 119, 6, 6);
  ellipse(x + 16, y - 119, 6, 6);

  fill(0);
  noStroke();
  let mouthW = map(shrinkMouthOpen, 0, 40, 2, 16);
  let mouthH = map(shrinkMouthOpen, 0, 40, 2, 20);
  ellipse(x, y - 90, mouthW, mouthH);

  strokeWeight(4);
  stroke(0);
  line(x - 35, y - 140, x - 15, y - 150);
  line(x + 15, y - 150, x + 35, y - 140);
  noStroke();

  fill(255, 220, 200);
  push();
  translate(x - 40, y - 40);
  rotate(radians(-45));
  rect(0, 0, 15, 60, 10);
  pop();

  push();
  translate(x + 25, y - 40);
  rotate(radians(45));
  rect(0, 0, 15, 60, 10);
  pop();
}

function drawZapSquiggle(x, y, progress) {
  push();
  stroke(100, 150, 255);
  strokeWeight(3);
  noFill();

  // Starting point from off-screen with tilt
  let startX = -50;
  let startY = y - 40;

  // Target point - pointed lower down (about 80 pixels down from center)
  let targetX = x;
  let targetY = y + 80;

  // Draw straight beam from off-screen to target point
  line(startX, startY, targetX, targetY);

  // Draw sparkles along the tilted beam path
  noStroke();
  for (let i = 0; i < 35; i++) {
    let t = random();
    let sx = lerp(startX, targetX, t);
    let sy = lerp(startY, targetY, t);
    // Add random spread perpendicular to beam
    let perpX = -(targetY - startY) / dist(startX, startY, targetX, targetY);
    let perpY = (targetX - startX) / dist(startX, startY, targetX, targetY);
    sx += perpX * random(-30, 30) + random(-10, 10);
    sy += perpY * random(-30, 30) + random(-10, 10);
    let sparkleSize = random(4, 10);
    let alpha = random(120, 255);
    fill(100, 150, 255, alpha);
    ellipse(sx, sy, sparkleSize);

    // Add white core to make sparkles more prominent
    fill(255, 255, 255, alpha * 0.7);
    ellipse(sx, sy, sparkleSize * 0.4);
  }

  // Only show energy circle briefly at the beginning of the effect
  if (progress < 0.3) {
    stroke(100, 150, 255);
    strokeWeight(2);
    noFill();
    let radius = 40 * (1 - progress * 3); // Shrinks quickly
    let alpha = map(progress, 0, 0.3, 255, 0);
    stroke(100, 150, 255, alpha);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let r = radius + sin(a * 8 + frameCount * 0.3) * 5;
      let px = targetX + cos(a) * r;
      let py = targetY + sin(a) * r;
      vertex(px, py);
    }
    endShape(CLOSE);
  }

  pop();
}

function drawZapSquiggle(x, y, progress) {
  push();
  stroke(100, 150, 255);
  strokeWeight(3);
  noFill();

  // Starting point from off-screen with tilt
  let startX = -50;
  let startY = y - 40;

  // Target point - pointed lower down (about 80 pixels down from center)
  let targetX = x;
  let targetY = y + 80;

  // Draw straight beam from off-screen to target point
  line(startX, startY, targetX, targetY);

  // Draw sparkles along the tilted beam path
  noStroke();
  for (let i = 0; i < 35; i++) {
    let t = random();
    let sx = lerp(startX, targetX, t);
    let sy = lerp(startY, targetY, t);
    // Add random spread perpendicular to beam
    let perpX = -(targetY - startY) / dist(startX, startY, targetX, targetY);
    let perpY = (targetX - startX) / dist(startX, startY, targetX, targetY);
    sx += perpX * random(-30, 30) + random(-10, 10);
    sy += perpY * random(-30, 30) + random(-10, 10);
    let sparkleSize = random(4, 10);
    let alpha = random(120, 255);
    fill(100, 150, 255, alpha);
    ellipse(sx, sy, sparkleSize);

    // Add white core to make sparkles more prominent
    fill(255, 255, 255, alpha * 0.7);
    ellipse(sx, sy, sparkleSize * 0.4);
  }

  // Only show energy circle briefly at the beginning of the effect
  if (progress < 0.3) {
    stroke(100, 150, 255);
    strokeWeight(2);
    noFill();
    let radius = 40 * (1 - progress * 3); // Shrinks quickly
    let alpha = map(progress, 0, 0.3, 255, 0);
    stroke(100, 150, 255, alpha);
    beginShape();
    for (let a = 0; a < TWO_PI; a += 0.2) {
      let r = radius + sin(a * 8 + frameCount * 0.3) * 5;
      let px = targetX + cos(a) * r;
      let py = targetY + sin(a) * r;
      vertex(px, py);
    }
    endShape(CLOSE);
  }

  pop();
}

function drawYouText() {
  if (shrinkProgress < 1) {
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("YOU", width / 2, 30);
  }
}

//MAZE GAME CODE

function mazeCode(){
  let cols = 22;
  let rows = 22;
  let w = 26;
  let grid = [];
  let player;
  let flag;
  let timer = 60;
  let lastTime;
  let mazeAttempts = 0;
  let maxMazeAttempts = 3;
  let gameOver = false;
  let keyState = {};
  let distractions = [];
  let lightBulbImg;
  let flagImg;

  // Hide TV screen elements
  if (enterMazeButton) enterMazeButton.hide();
  showTVScreen = false;

  function setup() {
    createCanvas(cols * w + 30, rows * w + 70);
    textAlign(CENTER, CENTER);
    textSize(18);
    // Load the light bulb image
    lightBulbImg = loadImage('attached_assets/—Pngtree—cartoon glowing yellow light bulb_8229577_1754613156158.png');
    // Load the flag image  
    flagImg = loadImage('attached_assets/clipart102273_1754618705841.png');
    createMazeLayout();
    player = new Player(0, 0);
    flag = createVector(cols - 1, rows - 1);
    lastTime = millis();
  }

  function draw() {
    background(255, 166, 182);

    for (let cell of grid) {
      cell.show();
    }

    // Timer text with better styling
    fill(40, 40, 40);
    textSize(20);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(`Time Left: ${max(0, timer)}`, width / 2, height - 30);

    // Lives display - centered and aligned
    let circleSize = 18;
    let spacing = 30;
    let totalWidth = (maxMazeAttempts - 1) * spacing;
    let startX = width / 2 - totalWidth / 2;

    for (let i = 0; i < maxMazeAttempts; i++) {
      if (i < (maxMazeAttempts - mazeAttempts)) {
        fill(40, 40, 40);
      } else {
        noFill();
      }
      stroke(40, 40, 40);
      strokeWeight(2);
      ellipse(startX + i * spacing, height - 50, circleSize);
    }

    if (millis() - lastTime >= 1000 && !gameOver) {
      timer--;
      lastTime = millis();
    }

    // Display blue flag image
    if (flagImg) {
      push();
      imageMode(CENTER);
      image(flagImg, flag.x * w + w * 0.5, flag.y * w + w * 0.5, w * 0.8, w * 0.8);
      pop();
    } else {
      // Fallback to green square if image not loaded
      fill(0, 255, 0);
      rect(flag.x * w + w * 0.25, flag.y * w + w * 0.25, w * 0.5, w * 0.5);
    }

    player.handleInput();
    player.update();
    player.show();

    for (let distraction of distractions) {
      distraction.show();
      distraction.checkCollision(player);
    }

    if (floor(player.x / w) === flag.x && floor(player.y / w) === flag.y) {
      // Soft, warm green that's easier on the eyes
      fill(76, 175, 80);
      textSize(28);
      textStyle(BOLD);
      text("Hope Restored!", width / 2, height / 2);

      // Add a subtle shadow effect for better readability
      fill(255, 255, 255, 180);
      textSize(28);
      textStyle(BOLD);
      text("Hope Restored!", width / 2 + 1, height / 2 + 1);

      // Main text on top
      fill(76, 175, 80);
      textSize(28);
      textStyle(BOLD);
      text("Hope Restored!", width / 2, height / 2);

      noLoop();
      return;
    }

    if (timer <= 0 && !gameOver) {
      mazeAttempts++;
      if (mazeAttempts >= maxMazeAttempts) {
        gameOver = true;

        // Soft, muted red that's easier on the eyes
        fill(183, 28, 28);
        textSize(28);
        textStyle(BOLD);
        text("Hope Lost...", width / 2, height / 2);

        // Add a subtle shadow effect for better readability
        fill(255, 255, 255, 180);
        textSize(28);
        textStyle(BOLD);
        text("Hope Lost...", width / 2 + 1, height / 2 + 1);

        // Main text on top
        fill(183, 28, 28);
        textSize(28);
        textStyle(BOLD);
        text("Hope Lost...", width / 2, height / 2);

        noLoop();
      } else {
        timer = 60;
        createMazeLayout();    // Regenerate maze here
        player = new Player(0, 0);
      }
    }

    // Restart instruction with better styling
    textSize(14);
    textStyle(NORMAL);
    textAlign(CENTER, CENTER);
    fill(60, 80, 100);
    text("Press 'R' to Restart", width / 2, height - 8);
  }

  function keyPressed() {
    keyState[keyCode] = true;

    if (key === 'r' || key === 'R') {
      gameOver = false;
      mazeAttempts = 0;
      timer = 60;
      createMazeLayout();
      player = new Player(0, 0);
      loop();
    }
  }

  function keyReleased() {
    keyState[keyCode] = false;
  }

  function getCurrentCell() {
    let i = floor(player.x / w);
    let j = floor(player.y / w);
    return grid[j * cols + i];
  }

  class Cell {
    constructor(i, j, walls) {
      this.i = i;
      this.j = j;
      this.walls = walls;
    }

    show() {
      let x = this.i * w;
      let y = this.j * w;
      stroke(0);
      strokeWeight(2);
      if (this.walls[0]) line(x, y, x + w, y);
      if (this.walls[1]) line(x + w, y, x + w, y + w);
      if (this.walls[2]) line(x + w, y + w, x, y + w);
      if (this.walls[3]) line(x, y + w, x, y);
    }
  }

  class Player {
    constructor(i, j) {
      this.i = i;
      this.j = j;
      this.x = i * w + w / 2;
      this.y = j * w + w / 2;
      this.targetX = this.x;
      this.targetY = this.y;
      this.speed = 3;
      this.moving = false;
    }

    move(di, dj) {
      this.i += di;
      this.j += dj;
      this.targetX = this.i * w + w / 2;
      this.targetY = this.j * w + w / 2;
      this.moving = true;
    }

    tryMove(di, dj) {
      let current = getCurrentCell();
      let wallCheck = {
        '1,0': !current.walls[1],
        '-1,0': !current.walls[3],
        '0,-1': !current.walls[0],
        '0,1': !current.walls[2],
      };

      if (wallCheck[`${di},${dj}`]) {
        this.move(di, dj);
      }
    }

    handleInput() {
      if (!this.moving) {
        if (keyState[RIGHT_ARROW]) this.tryMove(1, 0);
        else if (keyState[LEFT_ARROW]) this.tryMove(-1, 0);
        else if (keyState[UP_ARROW]) this.tryMove(0, -1);
        else if (keyState[DOWN_ARROW]) this.tryMove(0, 1);
      }
    }

    update() {
      if (this.moving) {
        let dx = this.targetX - this.x;
        let dy = this.targetY - this.y;
        let dist = sqrt(dx * dx + dy * dy);

        if (dist < this.speed) {
          this.x = this.targetX;
          this.y = this.targetY;
          this.moving = false;
        } else {
          this.x += this.speed * dx / dist;
          this.y += this.speed * dy / dist;
        }
      }
    }

    show() {
      if (lightBulbImg) {
        // Display the light bulb image - made bigger and appears instantly
        push();
        imageMode(CENTER);
        image(lightBulbImg, this.x, this.y, w * 1.2, w * 1.2);
        pop();
      } else {
        // Fallback to yellow circle if image not loaded
        fill(255, 255, 0);
        ellipse(this.x, this.y, w * 1.0);
      }
    }
  }

  class Distraction {
    constructor(i, j) {
      this.i = i;
      this.j = j;
      this.x = i * w + w / 2;
      this.y = j * w + w / 2;
      this.collected = false;
    }

    show() {
      if (!this.collected) {
        fill(255, 100, 100);
        rect(this.x - w * 0.25, this.y - w * 0.25, w * 0.5, w * 0.5);
      }
    }

    checkCollision(player) {
      if (!this.collected && floor(player.x / w) === this.i && floor(player.y / w) === this.j) {
        this.collected = true;
        timer = max(0, timer - 5);
      }
    }
  }

  function createMazeLayout() {
    let layout = [];
    for (let j = 0; j < rows; j++) {
      let row = [];
      for (let i = 0; i < cols; i++) {
        row.push([1, 1, 1, 1]); // all walls
      }
      layout.push(row);
    }

    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        let r = floor(random(i + 1));
        [arr[i], arr[r]] = [arr[r], arr[i]];
      }
      return arr;
    }

    function carveMaze(i, j) {
      let directions = shuffle([0, 1, 2, 3]); // top, right, bottom, left
      for (let dir of directions) {
        let ni = i + [0, 1, 0, -1][dir];
        let nj = j + [-1, 0, 1, 0][dir];

        if (ni < 0 || ni >= cols || nj < 0 || nj >= rows) continue;

        if (layout[nj][ni].every(w => w === 1)) {
          layout[j][i][dir] = 0;
          layout[nj][ni][(dir + 2) % 4] = 0;
          carveMaze(ni, nj);
        }
      }
    }

    carveMaze(0, 0);

    // Add complexity with a few extra connections
    for (let n = 0; n < 30; n++) {
      let i = floor(random(cols));
      let j = floor(random(rows));
      let dir = floor(random(4));
      let ni = i + [0, 1, 0, -1][dir];
      let nj = j + [-1, 0, 1, 0][dir];

      if (ni >= 0 && ni < cols && nj >= 0 && nj < rows) {
        layout[j][i][dir] = 0;
        layout[nj][ni][(dir + 2) % 4] = 0;
      }
    }

    grid = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(i, j, layout[j][i]));
      }
    }

    // Create distractions
    distractions = [];
    let numDistractions = 10;
    while (distractions.length < numDistractions) {
      let i = floor(random(cols));
      let j = floor(random(rows));

      // Avoid placing on player start or goal
      if ((i === 0 && j === 0) || (i === cols - 1 && j === rows - 1)) continue;

      // Avoid duplicates
      if (distractions.some(d => d.i === i && d.j === j)) continue;

      distractions.push(new Distraction(i, j));
    }
  }

  // Override global functions for maze
  window.setup = setup;
  window.draw = draw;
  window.keyPressed = keyPressed;
  window.keyReleased = keyReleased;

  // Restart p5.js
  setup();
}
