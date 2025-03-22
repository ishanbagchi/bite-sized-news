export const storeInSession = (key: string, value: string) =>
	sessionStorage.setItem(key, value)

export const getFromSession = (key: string) => sessionStorage.getItem(key)

export const removeFromSession = (key: string) => sessionStorage.removeItem(key)

export const clearSession = () => sessionStorage.clear()
