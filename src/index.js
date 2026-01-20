var textWrapper = document.querySelector(".ml6 .letters");

textWrapper.innerHTML = textWrapper.textContent
  .trim()
  .split(" ")
  .map(
    (word) =>
      `<span class="word">${word.replace(
        /\S/g,
        "<span class='letter'>$&</span>",
      )}</span>`,
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
  let instructionsInput = document.querySelector("#user-instructions");
  let apiKey = "c5a77b10o404035t8533ef4bf02afcfc";
  let prompt = `User instructions: generate a short poem in french language about ${instructionsInput.value}`;
  let context =
    "You are a romantic poem expert. You like to write short poem in french language. Your mission is to generate a maximum 4 lines poem with a br tag for a line break between each lines. Make sure to follow the user instructions. Sign the poem with <em>SheCodes AI<em> with two break lines at the end of the poem";

  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

  let poemElement = document.querySelector("#poem");
  poemElement.classList.remove("hidden");
  poemElement.innerHTML = `<div class="blink">🤖 Generating a French poem about " ${instructionsInput.value} "</div>`;

  axios.get(apiUrl).then(displayPoem);
}

function displayPoem(response) {
  console.log("poem generated");
  new Typewriter("#poem", {
    strings: response.data.answer,
    autoStart: true,
    delay: 1,
    cursor: "",
  });
}
let poemFormElement = document.querySelector("#poem-generator-form");
poemFormElement.addEventListener("submit", generatePoem);
