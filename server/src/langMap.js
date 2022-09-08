const langMap = new Map([
  [
    "bash",
    {
      filename: "main.sh",
      cmd: "/bin/bash main.sh",
    },
  ],
  [
    "node",
    {
      filename: "main.js",
      cmd: "node main.js",
    },
  ],
  [
    "javascript",
    {
      filename: "main.js",
      cmd: "node main.js",
    },
  ],
  [
    "c",
    {
      filename: "main.c",
      cmd: "gcc main.c -o main && ./main",
    },
  ],
  [
    "cpp",
    {
      filename: "main.cpp",
      cmd: "gcc main.cpp -o main && ./main",
    },
  ],
]);
module.exports.langMap = langMap;
