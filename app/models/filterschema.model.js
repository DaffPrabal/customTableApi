module.exports = (mongoose) => {
  {
    const Filter = mongoose.model(
      "filter",
      mongoose.Schema(
        {
          class: String,
          filter: [],
        },
        { timestamps: true }
      )
    );
    return Filter;
  }
};
