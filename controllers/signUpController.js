const sign_up_index = (req, res) => {
  res.render(__dirname + '/../views/home/sign-up.handlebars', {layout: false});
};

const sign_up_add_user = async (req, res) => {
  res.render(__dirname + '/../views/home/sign-up.handlebars', {layout: false});
};

module.exports = {
  sign_up_index,
  sign_up_add_user
};
