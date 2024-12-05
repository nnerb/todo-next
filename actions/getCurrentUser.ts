
import { prisma } from "app/lib/prisma";
import { auth } from "auth";

const getCurrentUser = async () => {
  try {
    const session = await auth()
    // Check if the session has a valid email
    if (!session?.user?.email) {
      
      console.log("No email found in session, returning null.");
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email
      },
    });

    if (!currentUser) {
      console.log("No user found with the given email.");
      return null;
    }
    console.log(currentUser)
    return currentUser;
  } catch (error: any) {
    console.error("Error fetching the current user:", error); 
    return null;
  }
};

export default getCurrentUser;
