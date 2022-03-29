export const getSystemPixelRatio = () => {
  return new Promise((resolve, reject) => {
    my.getSystemInfo({
      keys: ['pixelRatio'],
      success: (res) => {
        if (!res || !res.pixelRatio) reject();
        resolve(res.pixelRatio);
      },
      fail: reject,
    });
  });
};
