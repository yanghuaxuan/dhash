import DHash from "../dist/src/index.js"

const input = document.querySelector("input");
input.addEventListener("input", () => {
  const url = URL.createObjectURL(input.files[0]);

  DHash.dHash(url).then(e => {
    const image = new Image();
    image.src = e;
    document.body.append(image);
  })
});