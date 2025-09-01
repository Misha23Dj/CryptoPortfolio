export const withTimeout = <T>(p: Promise<T>, ms = 5000) =>
  new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("Request timed out")), ms);
    p.then((v) => {
      clearTimeout(id);
      resolve(v);
    }).catch((e) => {
      clearTimeout(id);
      reject(e);
    });
  });
