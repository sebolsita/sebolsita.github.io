const container = document.querySelector('.container');
const layers = [
    document.querySelector('.background'),
    document.querySelector('.plan-a'),
    document.querySelector('.plan-b'),
    document.querySelector('.plan-c'),
    document.querySelector('.fog-wrapper-1 .fog'),
    document.querySelector('.fog-wrapper-2 .fog'),
    document.querySelector('.text'), 
]
const planLayers = [
    document.querySelector('.plan-a'),
    document.querySelector('.plan-b'),
    document.querySelector('.plan-c'),
];

const fogLayer1 = document.querySelector('.fog');
const fogLayer2 = document.querySelector('.fog-2');
let fogOffset1 = 0;
let fogOffset2 = 0;

// Function to detect mobile devices
function isMobileDevice(){
    return (
        typeof window.orientation !== "undefined"
        || navigator.userAgent.indexOf("IEMobile") !== -1
    );
};

const burgerMenu = document.querySelector('.burger-menu');
const menuItems = document.querySelector('.menu-items');

burgerMenu.addEventListener('click', () => {
    menuItems.style.display = menuItems.style.display === 'flex' ? 'none' : 'flex';
});

function adjustTextFontSize(){
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const textElement = document.querySelector(".text");
    if(screenWidth <= 1440 && screenHeight <= 3040) {
        textElement.style.fontSize = screenWidth <= screenHeight
            ? "12vw"
            : "10vh";
    } else {
        textElement.style.fontSize = "6vw";
    }
}
adjustTextFontSize();
window.addEventListener("resize", adjustTextFontSize);
window.addEventListener("orientationchange", adjustTextFontSize);

let lastTouchX = 0;
let lastTouchY = 0;
let touchDuration = 0;
const smoothAnimation = () => {
    if(touchDuration <= 0){
        return;
    }
    touchDuration -= 0.1;
    const fakeEvent = { pageX: lastTouchX, pageY: lastTouchY };
    parallaxEffect(fakeEvent);
    requestAnimationFrame(smoothAnimation);
};

// Add or modify existing JavaScript code based on your new project requirements
const speedMultipliers = isMobileDevice()
    ? [0, 0.05, 0.03, 0.02, 0.05, 0.01, 0.05] /* adjusted for .text */
    : [0, 0.025, 0.015, 0.01, 0.025, 0.005, 0.025]; /* adjusted for .text */

// const rotations = [
//     document.querySelector('.element-6')
// ];

let currentX = window.innerWidth / 2;
let currentY = window.innerHeight / 2;
let targetX = currentX;
let targetY = currentY;

function updateElementPositions() {
    currentX += (targetX - currentX) * 0.01;
    currentY += (targetY - currentY) * 0.1;

    layers.forEach((layer, index) => {
        const speed = speedMultipliers[index];
        const xOffset = currentX * speed;
        const yOffset = currentY * speed;
        const currentTransform = layer.style.transform;
        const updatedTransform = currentTransform.replace(/translate\([^)]*\)/, '') + " " + (layer === document.querySelector(".element-6") ? "rotate(-360deg)" : "")
        layer.style.transform = `${updatedTransform} translate(${-xOffset}px, ${-yOffset}px)`;
    });

    requestAnimationFrame(updateElementPositions);
}

const parallaxEffect = (e) => {
    targetX = e.pageX;
    targetY = e.pageY;
};

updateElementPositions();

container.addEventListener("mousemove", (e) => {
    touchDuration = 0;
    parallaxEffect(e);
});

container.addEventListener("touchstart", (e) => {
    touchDuration = 1;
    e.pageX = e.touches[0].clientX;
    e.pageY = e.touches[0].clientY;
    parallaxEffect(e);
});

container.addEventListener("touchmove", (e) => {
    touchDuration = 1;
    e.pageX = e.touches[0].clientX;
    e.pageY = e.touches[0].clientY;
    parallaxEffect(e);
});

container.addEventListener("touchend", (e) => {
    lastTouchX = e.changedTouches[0].clientX;
    lastTouchY = e.changedTouches[0].clientY;
    smoothAnimation();
});

function fogAnimation(){
    fogOffset1 += 0.2; // Adjust this value to control the speed of the fog1 movement
    fogLayer1.style.backgroundPosition = `${fogOffset1}px 0`;

    fogOffset2 -= 0.1; // Adjust this value to control the speed of the fog2 movement
    fogLayer2.style.backgroundPosition = `${fogOffset2}px 0`;

    requestAnimationFrame(fogAnimation);
}

function rotateElement6() {
    const elem6RotationSpeed = 0.1;
    const rotationElement = document.querySelector(".element-6 img"); // Update the selector
    const currentTransform = rotationElement.style.transform;
    const rotationRegex = /rotate\([^)]*\)/;
    const match = currentTransform.match(rotationRegex);
    const currentRotation = match ? parseFloat(match[0].slice(7, -4)) : 0;
    const newRotation = currentRotation + elem6RotationSpeed;
    const newTransform = currentTransform.replace(rotationRegex, '') + " rotate(" + newRotation + "deg)";
    rotationElement.style.transform = newTransform;
    requestAnimationFrame(rotateElement6);
  }

  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const href = link.getAttribute('href');
  
          let targetPos = document.querySelector(href).offsetTop;
          let startPos = window.pageYOffset;
          let distance = targetPos - startPos;
          let startTime = null;
  
          function animation(currentTime) {
              if(!startTime) startTime = currentTime;
              let elapsedTime = currentTime - startTime;
              let run = ease(elapsedTime, startPos, distance, 2000);
              window.scrollTo(0, run);
              if(elapsedTime < 2000) requestAnimationFrame(animation);
          }
  
          function ease(t, b, c, d) {
              t /= d/2;
              if (t < 1) return c/2*t*t + b;
              t--;
              return -c/2 * (t*(t-2) - 1) + b;
          }
  
          requestAnimationFrame(animation);
      });
  });


fogAnimation();
rotateElement6();