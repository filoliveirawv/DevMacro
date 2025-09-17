const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const srcMacro = "./MacroButton.jsx";
const navPath = path.join(
  process.env.HOME,
  "Code/workvivo/spark/src/wv-components/Navigation"
);
const topNavPath = path.join(navPath, "TopNav.jsx");

//   Before anything, lets revert to original
try {
  execSync("node RemoveMacro.js", { stdio: "inherit" });
} catch (err) {
  console.error("Failed to run RemoveMacro.js:", err.message);
}

// 1. Read MacroButton.jsx
let macroButtonCode = fs.readFileSync(srcMacro, "utf8");
macroButtonCode = macroButtonCode
  .replace(/export default MacroButton;?/g, "")
  .trim();

// 2. Read TopNav.jsx
let topNavCode = fs.readFileSync(topNavPath, "utf8");

// 3. Append MacroButton component if not present
if (!topNavCode.includes("const MacroButton = () =>")) {
  topNavCode += "\n\n" + macroButtonCode + "\n";
  console.log("MacroButton component appended.");
}

// 4. Insert MacroButton before <MyNotifications
const macroComponent =
  '{process.env.NODE_ENV === "development" && <MacroButton />}\n';
if (!topNavCode.includes(macroComponent)) {
  topNavCode = topNavCode.replace(/(<MyNotifications)/, macroComponent + "$1");
  console.log("MacroButton component inserted before MyNotifications.");
}

fs.writeFileSync(topNavPath, topNavCode, "utf8");
console.log("TopNav.jsx updated.");

// 5. Ignore file from git
try {
  execSync(`git update-index --assume-unchanged ${topNavPath}`, {
    stdio: "inherit",
    cwd: navPath,
  });
  console.log("TopNav.jsx now ignored from git.");
} catch (err) {
  console.error("Failed to ignore TopNav.jsx:", err.message);
}
