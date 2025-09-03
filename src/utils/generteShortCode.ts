import { nanoid } from "nanoid";

const generateShortCode = () => {
  const SAFE_ALPHABET =
    "23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
  // const maxAttempts = 5;
  // let attempts = 0;

  //while (attempts < maxAttempts) {
  const shortCode = nanoid(7);

  const cleanCode = shortCode.replace(
    /[0OIl1]/g,
    () => SAFE_ALPHABET[Math.floor(Math.random() * SAFE_ALPHABET.length)],
  );

  return cleanCode;

  // attempts++;
  //}

  //console.warn("Duplicados detectados");
  //return nanoid(8).replace(
  ///[0OIl1]/g,
  //() => SAFE_ALPHABET[Math.floor(Math.random() * SAFE_ALPHABET.length)],
  //);
};

export default generateShortCode;
