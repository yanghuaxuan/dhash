import DHash from "../dist/src/index.js";

DHash.dHash("xd");

const input = document.querySelector("input");
input.addEventListener("input", () => {
  const img = new Image(400, 400);
  img.src = URL.createObjectURL(input.files[0]);

  document.body.append(img);
  console.log(img);
});