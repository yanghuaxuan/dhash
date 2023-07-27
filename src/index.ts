import Hermite from 'hermite-resize';

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

const resize = (ctx: OffscreenCanvasRenderingContext2D, width: number, height: number) => new Promise<void>((resolve) => {
  const hermite = new Hermite();
  const finish_handler = () => {
    resolve();
  }

  hermite.resample(ctx.canvas, width, height, false, finish_handler);
});

/** TODO */
/** Horizontal difference hash computation 
 * 
 * Based on: https://www.hackerfactor.com/blog/index.php?/archives/529-Kind-of-Like-That.html
*/
const hash = (imgData: Uint8ClampedArray) => {
  let res = "";

  for (let i = 0; i < imgData.length - 4; i += 4) {
    /** Calcluate luminance pixel */
    const R = imgData[i]; 
    const G = imgData[i + 1]; 
    const B = imgData[i + 2]; 
    const lum = (0.2126*R + 0.7152*G + 0.0722*B);

    const R1 = imgData[i + 4]; 
    const G1 = imgData[i + 1 + 4]; 
    const B1 = imgData[i + 2 + 4]; 
    const lum1 = (0.2126*R1 + 0.7152*G1 + 0.0722*B1);

    res += lum > lum1 ? 1 : 0;
  }

  return res;
}

const dHash = (path: string, hs = 8) => 
new Promise<string>((resolve, reject) => {
      const img = new Image()
      img.src = path;

      img.addEventListener("load", () => {
        const canvas = new OffscreenCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          grayscale(ctx);
          resize(ctx, hs + 1, hs)
          .then(() => { 
            /** Create a new canvas that is of the same size as the new resized image */
            const imgData = ctx.getImageData(0,0, hs + 1, hs);
            const res = new OffscreenCanvas(hs + 1, hs);
            const resCtx = res.getContext("2d");
            if (resCtx) {
              resCtx.putImageData(imgData, 0, 0);

              resolve(hash(imgData.data));

            } else {
              reject(new Error("Cannot get Canvas context!"));
            }
          })
        } else {
          reject(new Error("Cannot get Canvas context!"));
        }
      });
    })

export default dHash;