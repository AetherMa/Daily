export const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export const randomRotation = () => {
  const value = (Math.random() * 4 - 2).toFixed(2);
  return `rotate(${value}deg)`;
};
