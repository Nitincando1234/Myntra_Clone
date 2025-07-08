import * as SecureStore from "expo-secure-store";

export const saveuserdata = async (_id: string, name: string, email: string) => {
    await SecureStore.setItemAsync("userid", _id);
    await SecureStore.setItemAsync("userName", name);
    await SecureStore.setItemAsync("email", email);
};

export const getuserdata = async () => {
    const _id = await SecureStore.getItemAsync("_id");
    const name = await SecureStore.getItemAsync("userName");
    const email = await SecureStore.getItemAsync("email");
    return { _id, name, email };
};

export const clearuserdata = async () => {
    await SecureStore.deleteItemAsync("_id");
    await SecureStore.deleteItemAsync("userName");
    await SecureStore.deleteItemAsync("email");
}