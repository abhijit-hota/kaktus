document
  .querySelector("#header > #nav > ul > .icon")
  .addEventListener("click", function (e) {
    this.parentElement.classList.toggle("responsive");
  });
