export const API_VERSION = {
  V1: "/api/v1",
};

const GROUP = {
  USERS: "/users",
  FRUIT: "/fruits",
};

export const ENDPOINT = {
  // auth
  LOGIN: `${API_VERSION.V1}${GROUP.USERS}/auth/login`,
  LOGOUT: `${API_VERSION.V1}${GROUP.USERS}/auth/logout`,
  // auth
  FRUIT: `${API_VERSION.V1}${GROUP.FRUIT}`,
  FRUIT_EDIT: `${API_VERSION.V1}${GROUP.FRUIT}/edit`,
  FRUIT_DELETE: `${API_VERSION.V1}${GROUP.FRUIT}/delete`,
};
