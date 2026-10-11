export const SESSION_STORAGE_KEY = "soulme:session"

export const AUTH_ATTRIBUTE = "data-auth"

export const authStateScript = `try{if(localStorage.getItem(${JSON.stringify(SESSION_STORAGE_KEY)})!==null)document.documentElement.setAttribute(${JSON.stringify(AUTH_ATTRIBUTE)},"")}catch(e){}`
