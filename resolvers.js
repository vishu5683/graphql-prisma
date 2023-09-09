import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: (_, args) => {
      return prisma.user.findUnique({
        where: { id: parseInt(args._id) },
      });
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      const { name, email, password } = input;

      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        throw new Error("User already exists with that email");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return newUser;
    },
  },
};

export default resolvers;
