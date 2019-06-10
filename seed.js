const { User, Track } = require("./models");

const main = async () => {
  try {
    await User.destroy({ where: {} });
    await Track.destroy({ where: {} });

    const darwin = await User.create({
      email: "darwin911@gmail.com",
      name: "Darwin",
      password_digest: ""
    });
    const test = await User.create({
      email: "test@test.com",
      name: "test",
      password_digest: ""
    });

    const track = await Track.create({
      title: "Lane 8 - No Captian",
      url: "http://www.google.com"
    });
  } catch (e) {
    console.error(e);
  }
  process.exit();
};

main();
