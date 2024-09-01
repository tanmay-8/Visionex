import NextAuth from "next-auth";

// importing providers
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        }),  
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account.provider === "google") {
                const { idToken } = account;
                const { email } = user;
                const { name } = profile;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ idToken, email, name }),
                    }
                );

                const data = await response.json();
                
                if(data && data.token){
                    user.token = data.token;
                }
                if(typeof window !== "undefined"){
                    localStorage.setItem("visionToken", data.token);
                }
            }
            return true;
        },
        async jwt(token, user) {
            if (user) {
                token = { ...token, ...user };
            }
            return token;
        },
        async session(session, token) {
            session.user = token;
            return session;
        },
        
    },
});

export { handler as GET, handler as POST };
