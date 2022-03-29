export const getComponentSizeById = (id) => {
  return new Promise((resolve, reject) => {
    my.createSelectorQuery()
      .select(`#${id}`)
      .boundingClientRect()
      .exec((res) => {
        if (!res || !res.length || !res[0]) reject();
        const { width, height } = res[0];
        resolve({ width, height });
      });
  });
};
