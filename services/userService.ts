import { db } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";


export const updateUser = async (
    uid: string,
    updatedData: UserDataType
): Promise<ResponseType> => {
    try{

        const userRef = doc(db, "users", uid)
        await updateDoc(userRef, updatedData)

        return {success: true, msg: "update successfully"}
    }catch(error: any){
        console.log('error updating user', error);
        return {success: false, msg: error?.message}
        
    }
}