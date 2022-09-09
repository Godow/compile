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
      cmd: "g++ main.cpp -o main && ./main",
    },
  ],
  [
    "java",
    {
      filename: "HelloWorld.java",
      cmd: "javac HelloWorld.java && java HelloWorld",
    },
  ],
  [
    "golang",
    {
      filename: "main.go",
      cmd: "go run main.go",
    },
  ],
]);

module.exports.langMap = langMap;
