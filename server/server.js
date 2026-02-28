import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
import { createExpressApp } from "./config/express.js";
import { connectDB } from "./config/mongoose.js";
import { config } from "./config/config.js";
import { typeDefs } from "./graphql/typeDefs.js";
import { resolvers } from "./graphql/resolvers.js";
import { getUserFromReq } from "./middleware/auth.js";

// Minimal schema builder: graphql-http supports "schema + rootValue"
// We'll map resolvers manually via rootValue for Query/Mutation.
const schema = buildSchema(typeDefs);

const rootValue = {
  // Query
  students: (args, ctx) => resolvers.Query.students(args, null, ctx),
  courses: (args, ctx) => resolvers.Query.courses(args, null, ctx),
  myCourses: (args, ctx) => resolvers.Query.myCourses(args, null, ctx),
  studentsByCourse: (args, ctx) => resolvers.Query.studentsByCourse(null, args, ctx),
  me: (args, ctx) => resolvers.Query.me(args, null, ctx),

  // Mutation
  signup: (args, ctx) => resolvers.Mutation.signup(null, args, ctx),
  login: (args, ctx) => resolvers.Mutation.login(null, args, ctx),
  addCourse: (args, ctx) => resolvers.Mutation.addCourse(null, args, ctx),
  updateCourse: (args, ctx) => resolvers.Mutation.updateCourse(null, args, ctx),
  deleteCourse: (args, ctx) => resolvers.Mutation.deleteCourse(null, args, ctx),
  enrollCourse: (args, ctx) => resolvers.Mutation.enrollCourse(null, args, ctx),
  dropCourse: (args, ctx) => resolvers.Mutation.dropCourse(null, args, ctx)
};

async function start() {
  await connectDB();

  const app = createExpressApp();

  app.get("/", (_, res) => res.send("Student/Course GraphQL API is running"));

  app.use(
    "/graphql",
    createHandler({
      schema,
      rootValue,
      context: (req) => ({ user: getUserFromReq(req) })
    })
  );

  app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`GraphQL endpoint: http://localhost:${config.port}/graphql`);
  });
}

start().catch((err) => {
  console.error("Server failed to start:", err);
});