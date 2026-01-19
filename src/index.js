var textWrapper = document.querySelector(".ml6 .letters");

textWrapper.innerHTML = textWrapper.textContent
  .trim()
  .split(" ")
  .map(
    (word) =>
      `<span class="word">${word.replace(
        /\S/g,
        "<span class='letter'>$&</span>"
      )}</span>`
  )
  .join(" ");

anime
  .timeline({ loop: true })
  .add({
    targets: ".ml6 .letter",
    translateY: ["1.1em", 0],
    translateZ: 0,
    duration: 750,
    delay: (el, i) => 50 * i,
  })
  .add({
    targets: ".ml6",
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000,
  });

function generatePoem(event) {
  event.preventDefault();
  let poemElement = document.querySelector("#poem");
  poemElement.innerHTML = "displaying poem...";
}

let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
