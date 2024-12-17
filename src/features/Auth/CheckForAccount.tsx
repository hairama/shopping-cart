import { getDatabase, ref, query, orderByChild, equalTo, get } from "firebase/database";

export async function checkForAccount(email: string): Promise<{ exists: boolean; uid?: string; name?: string }> {
  const db = getDatabase();
  const usersRef = ref(db, "users");
  const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));

  try {
    const snapshot = await get(emailQuery);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const uid = Object.keys(userData)[0]; // Assuming UID is the key
      const user = userData[uid];
      console.log(`Account found: UID=${uid}, Name=${user.first_name}`);
      return { exists: true, uid, name: user.first_name };
    } else {
      console.log("No account found for email:", email);
      return { exists: false };
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return { exists: false };
  }
}
