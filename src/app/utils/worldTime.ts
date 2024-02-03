export const worldTime = () => {
  const now = new Date();
  return now.getTime() - now.getTimezoneOffset() * 60000;
};
