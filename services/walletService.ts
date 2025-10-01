import { db } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";

export const createdrUpdateWallet = async (
    walletData: Partial<WalletType>
): Promise<ResponseType> => {
    try{
        let walletToSave = {...walletData}

        if(!walletData?.id){
            walletToSave.amount = 0;
            walletToSave.totalIncome = 0;
            walletToSave.totalExpenses = 0;
            walletToSave.created = new Date();
        };

        const walletRef = walletData?.id ? doc(db, "wallets", walletData?.id):
        doc(collection(db, "wallets"));

        await setDoc(walletRef, walletToSave, {merge: true});
        return {success: true, data: {...walletToSave, id: walletRef.id }};

    }catch(error: any){
        console.log('error creating or update waller: ', error);
        return { success: false, msg: error.message}
        
    }
}

export const deleteWallet = async (walletId: string): Promise<ResponseType> => {
    try{
        const walletRef = doc(db, "wallets", walletId);
        await deleteDoc(walletRef);

        return {success: true, msg: "wallet deleted successfully"};
        
    }catch(error: any){
        console.log('error deleting wallet: ', error);
        return { success: false, msg: error.message}
        
    }
}