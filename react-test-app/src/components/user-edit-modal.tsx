import React, { useState, useEffect } from "react";
import type { User, UserRequest } from "../types/user";

interface UserEditModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onUserUpdated: () => void;
}

export const UserEditModal: React.FC<UserEditModalProps> = ({
  user,
  isOpen,
  onClose,
  onUserUpdated,
}) => {
  const [formData, setFormData] = useState<UserRequest>({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !user) {
      setMessage({
        text: "名前とメールアドレスを入力してください",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { userService } = await import("../services/user-service");
      await userService.updateUser(user.id, formData);
      setMessage({ text: "ユーザーが更新されました", type: "success" });
      setTimeout(() => {
        onClose();
        onUserUpdated();
      }, 1000);
    } catch (error) {
      setMessage({ text: "ユーザー更新に失敗しました", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => {
    setMessage(null);
    onClose();
  };

  if (!isOpen || !user) return null;

  return (
    <div className="container">
      <h2>ユーザー編集</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="editName">名前:</label>
          <input
            type="text"
            id="editName"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="editEmail">メールアドレス:</label>
          <input
            type="email"
            id="editEmail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "更新中..." : "更新"}
        </button>
        <button type="button" onClick={handleClose} disabled={isLoading}>
          キャンセル
        </button>
        {message && <div className={message.type}>{message.text}</div>}
      </form>
    </div>
  );
};
