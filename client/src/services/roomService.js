import api from "./api";

// ==========================
// Get Users
// ==========================
export const getUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// ==========================
// Update Profile
// ==========================
export const updateProfile = async (formData) => {
  const response = await api.put(
    "/users/profile",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};