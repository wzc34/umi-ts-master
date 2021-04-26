/*
 * @Description: 
 * @Author: wangzhicheng
 * @Date: 2021-01-20 19:54:13
 */
import { StorageKey } from '@/constants';

export function getAuthority(str?: string): string | string[] {
    const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
    // authorityString could be admin, "admin", ["admin"]
    let authority;
    try {
        if (authorityString) {
        authority = JSON.parse(authorityString);
        }
    } catch (e) {
        authority = authorityString;
    }
    if (typeof authority === 'string') {
        return [authority];
    }

    return authority;
}
export function setAuthority(authority: string | string[]) {
    const proAuthority = typeof authority === 'string' ? [authority] : authority;
    localStorage.setItem(StorageKey.authority, JSON.stringify(proAuthority)); // auto reload
}

export function clearAuthority() {
    localStorage.removeItem(StorageKey.authority);
    localStorage.removeItem(StorageKey.currentUser);
    localStorage.removeItem(StorageKey.token);
}