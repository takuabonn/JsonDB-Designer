import "server-only";
import { cookies } from "next/headers";
import { initializeApp, cert, getApps, App } from 'firebase-admin/app';
import { SessionCookieOptions, getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// export const runtime = 'edge';

export const firebaseApp =
  getApps().find((it) => it.name === "firebase-admin-app") ||
  initializeApp(
    {
      credential: cert(
        // 環境変数から認証情報を取得
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)
      )
    },
    "firebase-admin-app"
  );
export const auth = getAuth(firebaseApp);
export const adminDB = getFirestore(firebaseApp)

export async function isUserAuthenticated(session: string | undefined = undefined) {
    const _session = session ?? (await getSession());
    if (!_session) return false;
  
    try {
      const isRevoked = !(await auth.verifySessionCookie(_session, true));
      return !isRevoked;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  export async function getCurrentUser() {
    const session = await getSession();
  
    if (!(await isUserAuthenticated(session))) {
      return null;
    }
  
    const decodedIdToken = await auth.verifySessionCookie(session!);
    const currentUser = await auth.getUser(decodedIdToken.uid);
  
    return currentUser;
  }

  async function getSession() {
    try {
      return cookies().get("__session")?.value;
    } catch (error) {
      return undefined;
    }
  }

  export async function createSessionCookie(idToken: string, sessionCookieOptions: SessionCookieOptions) {
    return auth.createSessionCookie(idToken, sessionCookieOptions);
  }
  
  export async function revokeAllSessions(session: string) {
    const decodedIdToken = await auth.verifySessionCookie(session);
  
    return await auth.revokeRefreshTokens(decodedIdToken.sub);
  }