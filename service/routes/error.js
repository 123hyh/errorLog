const router = require("koa-router")();
const fs = require("fs"),
  path = require("path");
router.prefix("/errors");
router.post(
  "/",
  (() => {
    return async ctx => {
      ctx.status = 204;
      await fs.writeFile(
        path.resolve(__dirname, "../log/dev.error.log"),
        `\n ${new Date()}：${ctx.request.body};`,
        { flag: "a", encoding: "utf-8", mode: "0666" },
        async err => {
          if (err) {
            return console.log(err);
          }
        }
      );
    };
  })()
);
module.exports = router;
