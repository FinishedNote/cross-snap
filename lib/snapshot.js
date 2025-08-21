const snapshot = ({
  url,
  width = 1440,
  height = 900,
  browsers = "chrome, firefox, webkit",
}) => {
  try {
    console.log(url, width, height, browsers);
  } catch (err) {
    console.error(err);
  }
};

export default snapshot;
