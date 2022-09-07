const koa = require("koa");
const bodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const cors = require("koa2-cors");
const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;
const { langMap } = require("./langMap");
// const usersRouter=require('./routers/users.js')
const app = new koa();
const router = new Router();

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser());
// const inputContent = "console.log(555)";
const playGround = path.join(__dirname, "playground");

// 预处理、收尾处理
app.use(async (ctx, next) => {
  const dateStr = new Date(Date.now() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 10);
  ctx.log = content => {
    fs.appendFileSync(
      playGround + "/" + dateStr.slice(0, 10) + ".log",
      dateStr.slice(11, -5) + "-" + content + "\n"
    );
  };

  await next();

  // 删除临时目录
  try {
    execSync(`rm -rf ${ctx.onceDirPath}`);
  } catch (e) {
    ctx.log("删除临时目录失败:", e.message);
  }

  // 整理返回值
  if (ctx.body) {
    ctx.status = 200;
    ctx.success = true;
  } else {
    ctx.status = 501;
    ctx.success = false;
    ctx.body = "Error";
  }
});

// 编程环境映射
app.use(async (ctx, next) => {
  const lang = ctx.request.body.lang;

  if (!lang || !langMap.has(lang)) {
    ctx.log("获取语言选项失败");
    return;
  }

  ctx.lang = lang;
  ctx.cmd = langMap.get(lang).cmd;
  ctx.ext = langMap.get(lang).ext;

  await next();
});

// 创建语言目录
app.use(async (ctx, next) => {
  ctx.langDir = playGround + "/" + ctx.lang;

  try {
    execSync(`mkdir -p ${ctx.langDir}`);
  } catch (e) {
    ctx.log("创建语言目录失败:", e.message);
    return;
  }
  await next();
});

// 创建一次性临时目录
app.use(async (ctx, next) => {
  try {
    ctx.onceDirPath = ctx.langDir + "/" + Date.now().toString();
    execSync(`mkdir -p ${ctx.onceDirPath}`);
  } catch (e) {
    ctx.log("创建临时目录失败:", e.message);
    return;
  }

  await next();
});

// 创建程序文件并写入内容
app.use(async (ctx, next) => {
  ctx.codeFilePath = ctx.onceDirPath + "/main" + ctx.ext;
  try {
    fs.writeFileSync(ctx.codeFilePath, ctx.request.body.inputContent);
  } catch (e) {
    ctx.log("代码写入文件失败:", e.message);
    return;
  }

  await next();
});

// 执行程序文件
app.use(async (ctx, next) => {
  try {
    const rlt = execSync(`${ctx.cmd} ${ctx.codeFilePath}`);
    ctx.body = rlt.toString();
  } catch (e) {
    ctx.log("程序执行失败:", e.message);
    ctx.body = e.message;
  }
});

router.get("/", ctx => {
  ctx.body = "Hello koa !!!!";
});
// router.use(usersRouter)
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => {
  console.log("正在监听3000端口的服务");
});
