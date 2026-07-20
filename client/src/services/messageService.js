import api from "./api";

// ==========================
// Get Messages
// ==========================
export const getMessages = async (receiverId) => {
  const { data } = await api.get(`/messages/${receiverId}`);
  return data;
};

// ==========================
// Send Message
// ==========================
export const sendMessage = async (receiverId, formData) => {
  const { data } = await api.post(
    `/messages/send/${receiverId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

// ==========================
// Seen Messages
// ==========================
export const markMessagesSeen = async (userId) => {
  const { data } = await api.put(`/messages/seen/${userId}`);
  return data;
};

// ==========================
// Delete Message
// ==========================
export const deleteMessage = async (messageId) => {
  const { data } = await api.delete(`/messages/${messageId}`);
  return data;
};