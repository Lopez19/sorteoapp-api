import Role from "../models/Rol";

export const createRoles = async () => {
  try {
    // Count the number of documents in the collection
    const count = await Role.estimatedDocumentCount();

    // If there are no documents in the collection, create them
    if (count > 0) return;

    // Create the roles
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "moderator" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
