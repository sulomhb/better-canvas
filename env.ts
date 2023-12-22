export let YOUTUBE_API_KEY = "";
export let CANVAS_API_TOKEN = "";
export let CURRENT_USER_EMAIL = "";

export function setCanvasAPIToken(token) {
  CANVAS_API_TOKEN = token;
}

export function getCanvasAPIToken() {
  return CANVAS_API_TOKEN;
}

export function setCurrentUserEmail(token) {
  CURRENT_USER_EMAIL = token;
}

export function getCurrentUserEmail() {
  return CURRENT_USER_EMAIL;
}
