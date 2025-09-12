import React, { useState } from "react";

interface UserSearchFormProps {
  onSearch: (name: string) => void;
  onGetAllUsers: () => void;
}

export const UserSearchForm: React.FC<UserSearchFormProps> = ({
  onSearch,
  onGetAllUsers,
}) => {
  const [searchName, setSearchName] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchName.trim()) {
      alert("検索する名前を入力してください");
      return;
    }
    onSearch(searchName);
  };

  return (
    <div className="container">
      <h2>ユーザー検索</h2>
      <div className="search-container">
        <div className="form-group">
          <label htmlFor="searchName">名前で検索:</label>
          <input
            type="text"
            id="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="検索する名前を入力"
          />
        </div>
        <button onClick={handleSearch}>検索</button>
        <button onClick={onGetAllUsers}>全ユーザー表示</button>
      </div>
    </div>
  );
};
