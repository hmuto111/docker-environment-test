import React, { useState } from "react";
import type { UserRequest } from "../types/user";

interface UserCreateFormProps {
  onUserCreated: () => void;
}

export const UserCreateForm: React.FC<UserCreateFormProps> = ({
  onUserCreated,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setMessage({
        text: "名前とメールアドレスを入力してください",
        type: "error",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { userService } = await import("../services/user-service");
      await userService.createUser(formData);
      setMessage({ text: "ユーザーが作成されました", type: "success" });
      setFormData({ name: "", email: "" });
      onUserCreated();
    } catch (error) {
      setMessage({ text: "ユーザー作成に失敗しました", type: "error" });
    } finally {
      setIsLoading(false);
    }

    // 3秒後にメッセージを消去
    setTimeout(() => setMessage(null), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container">
      <h2>新規ユーザー作成</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">名前:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="名前を入力してください"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">メールアドレス:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="メールアドレスを入力してください"
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "作成中..." : "ユーザー作成"}
        </button>
        {message && <div className={message.type}>{message.text}</div>}
      </form>
    </div>
  );
};
