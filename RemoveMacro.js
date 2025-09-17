const path = require("path");
const { execSync } = require("child_process");
const navPath = path.join(
  process.env.HOME,
  "Code/workvivo/spark/src/wv-components/Navigation"
);
const topNavPath = path.join(navPath, "TopNav.jsx");

try {
  execSync(
    `
      git update-index --no-assume-unchanged ${topNavPath};
      git restore ${topNavPath};
    `,
    {
      stdio: "inherit",
      cwd: navPath,
    }
  );
  console.log("TopNav.jsx reverted");
} catch (err) {
  console.error("Failed to revert TopNav.jsx:", err.message);
}
