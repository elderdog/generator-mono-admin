import Cookies from 'js-cookie'

/**
 * 如果引用这个文件，必须要有下面的环境变量
 */
declare const UMI_APP_TOKEN_KEY: string

export function getToken() {
  return Cookies.get(UMI_APP_TOKEN_KEY)
}

export function setToken(token: string) {
  return Cookies.set(UMI_APP_TOKEN_KEY, token)
}

export function removeToken() {
  return Cookies.remove(UMI_APP_TOKEN_KEY)
}
