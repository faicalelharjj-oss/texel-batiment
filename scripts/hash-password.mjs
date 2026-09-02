import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error("Usage: node scripts/hash-password.mjs <mot-de-passe>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);

// Next.js expand les "$" dans les fichiers .env (reference de variable).
// On echappe donc chaque "$" pour que le hash soit colle tel quel dans .env.
const escaped = hash.replaceAll("$", "\\$");

console.log("Collez cette ligne dans .env :");
console.log(`ADMIN_PASSWORD_HASH="${escaped}"`);
