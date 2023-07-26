class DHash {
  static dHash(path: string) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = path;

      img.addEventListener("load", () => {
        const canvas = new OffscreenCanvas(img.width, img.height);
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0);

          canvas.convertToBlob().then((e) => {
            resolve(URL.createObjectURL(e));
          }).catch(e => {
            reject(e);
          });
          }
      });
    })
  }
}

export default DHash;
