export const secretJWK = {
  kty: "oct",
  k: process.env.JOSE_SECRET || "JOSE_SECRET",
};
