import React from "react";
import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
  onEditUser: (user: User) => void;
  onDeleteUser: (id: number) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  const handleDelete = (id: number) => {
    if (window.confirm("このユーザーを削除しますか？")) {
      onDeleteUser(id);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("ja-JP");
  };

  // usersが配列でない場合の安全な処理
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="container">
      <h2>ユーザー一覧</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>名前</th>
            <th>メールアドレス</th>
            <th>作成日時</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {safeUsers.length === 0 ? (
            <tr>
              <td colSpan={5}>ユーザーが見つかりませんでした</td>
            </tr>
          ) : (
            safeUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{formatDate(user.createdAt)}</td>
                <td>
                  <button onClick={() => onEditUser(user)}>編集</button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(user.id)}
                  >
                    削除
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
