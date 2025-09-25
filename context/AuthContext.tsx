
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import { Auth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, User } from "firebase/auth"
import { auth, db } from "@/config/firebase"
import { AuthContextType, UserType } from "@/types"
import { doc, getDoc, setDoc } from "firebase/firestore"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType>(null);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };

    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
  };
  const register = async (email: string, password: string, name: string) => {
    try {
      let response = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", response?.user?.uid), {
        name,
        email,
        uid: response?.user?.uid
      });
      return { success: true };

    } catch (error: any) {
      let msg = error.message;
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData: UserType = {
          uid: data.uid,
          name: data.name || null,
          email: data.email || null,
          image: data.image || null
        };
        setUser({ ...userData });
      }
    } catch (error: any) {
      let msg = error.message;
      // return { success: false, msg };
      console.log("Error updating user data:", msg);
      
    }
  };

  const contextValue: AuthContextType = {
    user,
    setUser,
    login,
    register,
    updateUserData
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
