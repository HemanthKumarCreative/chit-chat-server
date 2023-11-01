const { Sequelize } = require("sequelize");
const Message = require("../models/Message");
const ArchivedMessage = require("../models/ArchivedMessage");

const CronJob = require("cron").CronJob;

const job = new CronJob("0 0 * * *", async function () {
  try {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const oldMessages = await Message.findAll({
      where: {
        timestamp: {
          [Sequelize.Op.lt]: oneDayAgo,
        },
      },
    });

    await ArchivedMessage.bulkCreate(
      oldMessages.map((message) => message.toJSON())
    );

    await Message.destroy({
      where: {
        timestamp: {
          [Sequelize.Op.lt]: oneDayAgo,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
});

module.exports = { job };
