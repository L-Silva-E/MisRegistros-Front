import { useState } from "react";
import axios, { AxiosError } from "axios";

import { useAuth } from "./useAuth";
import { User } from "../types";
import { API_BASE_URL, API_KEY } from "../../../shared/constants/environment";

interface AvatarResult {
  success: boolean;
  message?: string;
}

interface BackendError {
  details: string;
}

export function useAvatarManagement() {
  const { token, updateUser } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const authHeaders = {
    "api-key": API_KEY,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const uploadAvatar = async (file: File): Promise<AvatarResult> => {
    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    try {
      const { data } = await axios.patch<{ data: User }>(
        `${API_BASE_URL}/user/me/avatar`,
        formData,
        { headers: authHeaders },
      );
      updateUser(data.data);
      return { success: true };
    } catch (err) {
      const axiosErr = err as AxiosError<BackendError>;
      return {
        success: false,
        message: axiosErr.response?.data?.details,
      };
    } finally {
      setUploading(false);
    }
  };

  const deleteAvatar = async (): Promise<AvatarResult> => {
    setDeleting(true);
    try {
      const { data } = await axios.delete<{ data: User }>(
        `${API_BASE_URL}/user/me/avatar`,
        { headers: authHeaders },
      );
      updateUser(data.data);
      return { success: true };
    } catch (err) {
      const axiosErr = err as AxiosError<BackendError>;
      return {
        success: false,
        message: axiosErr.response?.data?.details,
      };
    } finally {
      setDeleting(false);
    }
  };

  return { uploading, deleting, uploadAvatar, deleteAvatar };
}
