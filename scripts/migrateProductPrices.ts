/**
 * One-time migration: converts price fields in Firestore from string to number.
 *
 * Run with:
 *   npx ts-node --project tsconfig.json scripts/migrateProductPrices.ts
 *
 * Requires a .env file with NEXT_PUBLIC_FIREBASE_* variables.
 * Safe to run multiple times (skips products where price is already a number).
 */
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, updateDoc, writeBatch } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrateProductPrices() {
  console.log("Starting price migration...");
  let totalUpdated = 0;
  let totalSkipped = 0;

  const usersSnapshot = await getDocs(collection(db, "users"));

  for (const userDoc of usersSnapshot.docs) {
    const productsRef = collection(db, `users/${userDoc.id}/products`);
    const productsSnapshot = await getDocs(productsRef);

    const batch = writeBatch(db);
    let batchCount = 0;

    for (const productDoc of productsSnapshot.docs) {
      const price = productDoc.data().price;
      if (typeof price === "string") {
        const numericPrice = Number(price) || 0;
        batch.update(doc(db, `users/${userDoc.id}/products`, productDoc.id), {
          price: numericPrice,
        });
        batchCount++;
        totalUpdated++;
      } else {
        totalSkipped++;
      }
    }

    if (batchCount > 0) {
      await batch.commit();
      console.log(`User ${userDoc.id}: updated ${batchCount} products`);
    }
  }

  console.log(`Migration complete. Updated: ${totalUpdated}, Skipped: ${totalSkipped}`);
}

migrateProductPrices().catch(console.error);
