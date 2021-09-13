module.exports = (mongoose) => {
  {
    const Workers = mongoose.model(
      "workers",
      mongoose.Schema(
        {
          name: [],
          status: [],
          description: [],
          "joining Date": [],
        },
        { timestamps: true }
      )
    );
    return Workers;
  }
};
