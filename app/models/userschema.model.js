module.exports = (mongoose) => {
  {
    const Users = mongoose.model(
      "userList",
      mongoose.Schema(
        {
          name: {},
          email: {},
          createdDate: {},
          lastLogin: {},
        },
        { timestamps: true }
      )
    );
    return Users;
  }
};
