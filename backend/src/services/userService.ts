import userRepository from "../repositories/userRepository";
import { AppError } from "../middleware/errorHandler";
import { UpdateUserDto } from "../dto/user.dto";

export class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserById(id: number) {
    const user = await userRepository.findByIdWithTasks(id);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async updateUser(id: number, data: UpdateUserDto, requestingUserId: number) {
    // Check if user trying to update their own profile
    if (requestingUserId !== id) {
      throw new AppError("You are not authorized to update this user", 403);
    }

    // Check if email is already taken by another user
    if (data.email) {
      const existingUser = await userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new AppError("Email is already taken", 409);
      }
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.email) updateData.email = data.email;

    return userRepository.update(id, updateData);
  }

  async deleteUser(id: number, requestingUserId: number) {
    // Users can only delete their own account
    if (requestingUserId !== id) {
      throw new AppError("You are not authorized to delete this user", 403);
    }

    await userRepository.delete(id);
  }
}

export default new UserService();
