module.exports = (mongoose) => {
  {
    const Header = mongoose.model(
      "header",
      mongoose.Schema(
        {
          class: String,
          headerToShow: [],
        },
        { timestamps: true }
      )
    );
    return Header;
  }
};
