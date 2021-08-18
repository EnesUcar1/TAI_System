const sign_in_index = (req, res) => {
  res.render(__dirname + '/../views/home/sign-in.handlebars', {layout: false});
};

const sign_in_login = async (req, res) => {
  res.render(__dirname + '/../views/home/sign-in.handlebars', {layout: false});
};

module.exports = {
  sign_in_index,
  sign_in_login
};
