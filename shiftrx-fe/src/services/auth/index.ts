export const setAccessToken = async (token: string) => {
  localStorage.setItem("token", token);
};

export const getAccessToken = async (): Promise<string | null> => {
  return localStorage.getItem("token");
};
