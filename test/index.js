import dHash from "../dist/src/index.js"

/** Hamming distance calculator */
const hamming = (bit_s1, bit_s2 ) => {
  if (bit_s1.length != bit_s2.length) {
    return null;
  }
  let distance = 0;
  bit_s1.split('').forEach((c, idx) => {
    if(c !== bit_s2[idx]) distance += 1;
  })
  return distance;
};

const doc_image1 = document.getElementById("image1");
const doc_image2 = document.getElementById("image2");
const doc_btn = document.getElementById("ham_btn");

let input1, input2;

doc_image1.addEventListener("input", async () => {
  input1 = await dHash(URL.createObjectURL(doc_image1.files[0]))
  console.log(input1);
})
doc_image2.addEventListener("input", async () => {
  input2 = await dHash(URL.createObjectURL(doc_image2.files[0]))
  console.log(input2);
})

doc_btn.addEventListener("click", () => {
  console.log(hamming(input1, input2));
})
