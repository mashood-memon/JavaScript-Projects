const block = document.getElementById("block");
const hole = document.getElementById("hole");
const char = document.getElementById("char");
let jumping = 0;
hole.addEventListener("animationiteration", () => {
  let random = -(Math.random() * 300 + 150);
  console.log(random);
  hole.style.top = random + "px";
});

setInterval(() => {
  let charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
  if (jumping === 0 && charTop < 480) {
    char.style.top = charTop + 7 + "px";
  }
  var blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var cTop = -(500 - charTop);
  if (charTop > 480 || (blockLeft < 20 && blockLeft > -50 && cTop < holeTop)) {
    alert("GAME OVER");
    char.style.top = 100 + "px";
  }
}, 50);

function jump() {
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(() => {
    let charTop = parseInt(
      window.getComputedStyle(char).getPropertyValue("top")
    );
    if (charTop > 6) {
      char.style.top = charTop - 5 + "px";
    }
    if (jumpCount > 16) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
    console.log(jumpCount);
  }, 10);
}
