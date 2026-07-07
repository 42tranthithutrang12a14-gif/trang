import bcrypt from "bcryptjs";

const password = process.argv[2];

if (!password) {
  console.error('Cách dùng: npm run hash-password -- "mat-khau-cua-ban"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
// Escape $ thành \$ để Next.js không hiểu nhầm $2b/$10 là biến môi trường khi đọc .env
console.log("Dán dòng sau vào .env:\n");
console.log(`ADMIN_PASSWORD_HASH="${hash.replaceAll("$", "\\$")}"`);
