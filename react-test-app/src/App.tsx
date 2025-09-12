import React, { useState, useEffect } from "react";
import type { User } from "./types/user";
import { UserCreateForm } from "./components/user-create-form";
import { UserSearchForm } from "./components/user-search-form";
import { UserTable } from "./components/user-table";
import { UserEditModal } from "./components/user-edit-modal";
import { userService } from "./services/user-service";
import "./App.css";

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 初期ロード時にユーザー一覧を取得
  useEffect(() => {
    loadAllUsers();
  }, []);

  const loadAllUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await userService.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError("ユーザー取得に失敗しました");
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const searchResults = await userService.searchUsersByName(name);
      setUsers(searchResults);
    } catch (err) {
      setError("検索に失敗しました");
      console.error("Error searching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await userService.deleteUser(id);
      await loadAllUsers(); // 一覧を更新
    } catch (err) {
      alert("ユーザー削除に失敗しました");
      console.error("Error deleting user:", err);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  return (
    <div className="App">
      <h1>ユーザー管理システム</h1>

      <UserCreateForm onUserCreated={loadAllUsers} />

      <UserSearchForm onSearch={handleSearch} onGetAllUsers={loadAllUsers} />

      {loading && <div>読み込み中...</div>}
      {error && <div className="error">{error}</div>}

      <UserTable
        users={users}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      <UserEditModal
        user={editingUser}
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onUserUpdated={loadAllUsers}
      />
    </div>
  );
};

export default App;
