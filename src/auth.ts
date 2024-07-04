import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { doc, getDoc } from 'firebase/firestore';

// Constants
import { COLLECTION, UserSigninFormDataSchema } from '@/constants';

// Configs
import { db, firebaseAuth } from '@/config';

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          const { email, password } =
            await UserSigninFormDataSchema.parseAsync(credentials);
          const signInResponse = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
          );
          if (!signInResponse.user) {
            return null;
          }
          const userId = signInResponse.user.uid;
          const userData = await getDoc(doc(db, COLLECTION.USERS, userId));
          if (userData.exists()) {
            return {
              id: userId,
              name: userData.data().username,
              email: userData.data().email,
            };
          }
          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  session: {
    // Session expires
    maxAge: 24 * 60 * 60, // 24 hours
    strategy: 'jwt',
  },
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        if (token?.sub) {
          session.user.id = token.sub;
        }
        if (token?.name) {
          session.user.name = token.name;
        }
      }
      return session;
    },
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});
