// 编程语言与codemirror语言文件的映射
const codemirrorConfig = new Map([
  ["javascript", "javascript"],
  ["node", "javascript"],
  ["java", "clike"],
  ["c", "clike"],
  ["cpp", "clike"],
  ["bash", "shell"],
  ["golang", "go"],
  ["sql", "sql"],
]);

export { codemirrorConfig };
