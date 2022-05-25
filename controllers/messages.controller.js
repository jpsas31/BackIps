const getPublicMessage = () => {
  return {
    metadata: {
      api: "Api de back ips amiguis publica",
    },
    text: "This is a public message kk.",
  };
};

const getProtectedMessage = () => {
  return {
    metadata: {
      api: "Api de back ips amiguis privada",
    },
    text: "This is a protected message.",
  };
};


module.exports = {
  getPublicMessage,
  getProtectedMessage,
};
