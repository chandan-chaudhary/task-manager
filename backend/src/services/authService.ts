import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userRepository from "../repositories/userRepository";
import { AppError } from "../middleware/errorHandler";
import { RegisterDto, LoginDto } from "../dto/auth.dto";

export class AuthService {
  async register(data: RegisterDto) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const user = await userRepository.create({
      email: data.email,
      name: data.name,
      password: hashedPassword,
    });

    // // Generate JWT
    // const token = this.generateToken(user.id, user.email);

    return { user };
  }

  async login(data: LoginDto) {
    // Find user
    const user = await userRepository.findByEmail(data.email);
    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    // Generate JWT
    const token = this.generateToken(user.id, user.email);

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token,
    };
  }

  async getMe(userId: number) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  private generateToken(id: number, email: string): string {
    return jwt.sign({ id, email }, process.env.JWT_SECRET || "default-secret", {
      expiresIn: "7d",
    });
  }
}

export default new AuthService();
