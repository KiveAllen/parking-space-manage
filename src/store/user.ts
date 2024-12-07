import {defineStore} from 'pinia';

export interface UserStoreState {
    isLoggedIn: boolean;
    userInfo: any | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserStoreState => ({
        isLoggedIn: false,
        userInfo: null,

    }),
    actions: {
        login(userInfo: any) {
            this.isLoggedIn = true;
            this.userInfo = userInfo;
        },
        logout() {
            this.isLoggedIn = false;
            this.userInfo = null;
        }
    }
});