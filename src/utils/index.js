export const transformEmailToKey = (email) => {
  // Replace any character that is not alphanumeric, ".", "-", or "_" with "_"
  const transformedKey = email.replace(/[^a-zA-Z0-9\.\-_]/g, "_");
  return transformedKey;
};
