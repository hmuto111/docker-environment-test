import axios from "axios";
import type { User, UserRequest } from "../types/user";

const API_BASE_URL = "/api/users";

export const userService = {
  // 全ユーザー取得
  async getAllUsers(): Promise<User[]> {
    const response = await axios.get<User[]>(API_BASE_URL);
    return response.data;
  },

  // IDでユーザー取得
  async getUserById(id: number): Promise<User> {
    const response = await axios.get<User>(`${API_BASE_URL}/${id}`);
    return response.data;
  },

  // メールアドレスでユーザー取得
  async getUserByEmail(email: string): Promise<User> {
    const response = await axios.get<User>(`${API_BASE_URL}/email/${email}`);
    return response.data;
  },

  // 名前で検索
  async searchUsersByName(name: string): Promise<User[]> {
    const response = await axios.get<User[]>(`${API_BASE_URL}/search`, {
      params: { name },
    });
    return response.data;
  },

  // ユーザー作成
  async createUser(userRequest: UserRequest): Promise<User> {
    const response = await axios.post<User>(API_BASE_URL, userRequest);
    return response.data;
  },

  // ユーザー更新
  async updateUser(id: number, userRequest: UserRequest): Promise<User> {
    const response = await axios.put<User>(
      `${API_BASE_URL}/${id}`,
      userRequest
    );
    return response.data;
  },

  // ユーザー削除
  async deleteUser(id: number): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};
