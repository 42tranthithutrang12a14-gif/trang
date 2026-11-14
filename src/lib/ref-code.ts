// Characters: uppercase A-Z minus I,O + digits 2-9 (excluding 0,1)
const CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const PREFIX = "STDN";
const RANDOM_LENGTH = 4;

export function generateRefCode(): string {
  let random = "";
  for (let i = 0; i < RANDOM_LENGTH; i++) {
    random += CHARS[Math.floor(Math.random() * CHARS.length)];
  }
  return PREFIX + random;
}
