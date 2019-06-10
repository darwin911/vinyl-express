const { Sequelize } = require("sequelize");

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    login: true,
    operatorAliases: false,
    define: {
      underscored: true
    }
  });
} else {
  sequelize = new Sequelize({
    database: "vinyl-express",
    dialect: "postgres",
    operatorAliases: false,
    define: {
      underscored: true
    }
  });
}

const User = sequelize.define("users", {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: true }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password_digest: {
    type: Sequelize.STRING
  },
  picture: {
    type: Sequelize.STRING,
    defaultValue:
      "https://pngimage.net/wp-content/uploads/2018/05/default-profile-pic-png-8.png"
  }
});

const Track = sequelize.define("tracks", {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  url: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

User.hasMany(Track, {
  onDelete: "cascade"
});

Track.belongsTo(User, {
  foreignKey: {
    allowNull: false
  }
});

module.exports = {
  sequelize,
  User,
  Track
};
