const router = require('koa-router')();
const fs = require('fs'),
	path = require('path');
router.prefix('/errors');
router.post(
	'/',
	(() => {
		return async ctx => {
			ctx.status = 204;
			let filePath = ctx.request.body.includes('http://120.78.169.181')
				? 'prod.error.log'
				: 'dev.error.log';
			await fs.writeFile(
				path.resolve(__dirname, filePath),
				`\n ${new Date()}：${ctx.request.body};`,
				{ flag: 'a', encoding: 'utf-8', mode: '0666' },
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
