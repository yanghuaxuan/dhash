/* Modifies an existing Canvas context, grayscaling it */
const grayscale = (ctx: OffscreenCanvasRenderingContext2D) => {
  const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  const data = imgData.data;

  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg; // red
    data[i + 1] = avg; // green
    data[i + 2] = avg; // blue
  }

  ctx.putImageData(imgData, 0, 0);
}

const dHash = (path: string) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = path;

      img.addEventListener("load", () => {
        const canvas = new OffscreenCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          grayscale(ctx);

          canvas.convertToBlob().then((e) => {
            resolve(URL.createObjectURL(e));
          }).catch(e => {
            reject(e);
          });
          }
      });
    })
  }

export default dHash;