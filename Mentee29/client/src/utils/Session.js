import Cookies from 'js-cookie'

export function isAuthenticated () {
  if (typeof(Cookies.getJSON().user) === "undefined" || !Cookies.getJSON().user.isAuthenticated) {
    return false
  }
  return true
}

export function isAdmin () {
  if (typeof(Cookies.getJSON().user) === "undefined" || Cookies.getJSON().user.accountType !== "admin") {
    return false
  }
  return true
}

export function authenticateSuccess (token) {
  Cookies.set("user",token)
}

export function logout () {
  Cookies.set("user", 'value', { expires: -1})
  Cookies.set("user", {isAuthenticated:false})
}

export function getCookie (name) {
  return Cookies.getJSON()
}
