import { signInWithEmailAndPassword } from 'firebase/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Constants
import { UserSigninFormDataSchema } from '@/constants';

// Configs
import { firebaseAuth } from '@/config';

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
          const response = await signInWithEmailAndPassword(
            firebaseAuth,
            email,
            password,
          );
          const user = {
            id: response.user.uid,
            name: response.user.displayName,
            email: response.user.email,
          };
          return user;
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
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/sign-in',
  },
});
