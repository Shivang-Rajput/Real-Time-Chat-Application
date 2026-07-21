import api from "./api.js";

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

// ==========================
// Delete Account
// ==========================

export const deleteAccount = async () => {
  const response = await api.delete(
    "/auth/delete-account"
  );

  return response.data;
};