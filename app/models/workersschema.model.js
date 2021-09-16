module.exports = (mongoose) => {
  {
    const Workers = mongoose.model(
      "workerList",
      mongoose.Schema(
        {
          name: {},
          status: {},
          description: {},
          "joining Date": {},
        },
        { timestamps: true }
      )
    );
    return Workers;
  }
};
