module.exports = (mongoose) => {
  {
    const Header = mongoose.model(
      "header",
      mongoose.Schema(
        {
          class: String,
          headertoShow: [],
        },
        { timestamps: true }
      )
    );
    return Header;
  }
};
