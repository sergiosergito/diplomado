function getUsers(req, res) {
  res.json({
    message: "Welcome to the users API from controller",
  });
}

export default {
  getUsers,
};
