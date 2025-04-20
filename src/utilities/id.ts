import { generateRandomString, type RandomReader } from "@oslojs/crypto/random";

const DIGITS = "0123456789";
const LENGTH = 12;
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";

const random: RandomReader = {
  read: (bytes: Uint8Array): void => {
    crypto.getRandomValues(bytes);
  },
};

export const generateId = () =>
  generateRandomString(random, LOWERCASE, 1) +
  generateRandomString(random, DIGITS + LOWERCASE, LENGTH - 1);
