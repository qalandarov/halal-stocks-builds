"use strict";

// One static page handles every immutable release. The PR comment supplies its ID.
const parameters = new URLSearchParams(window.location.search);
const tag = parameters.get("build") || "";
const selected = /^ios-([1-9]\d*)\.([1-9]\d*)-([a-f0-9]{12})$/.exec(tag);

if (selected) {
  const buildNumber = `${selected[1]}.${selected[2]}`;
  const commit = selected[3];
  const repository = "https://github.com/qalandarov/halal-stocks-builds";
  const manifest = `https://qalandarov.github.io/halal-stocks-builds/manifests/${tag}.xml`;
  document.getElementById("number").textContent = `Build ${buildNumber}`;
  document.getElementById("commit").textContent = commit;
  document.getElementById("install").href =
    `itms-services://?action=download-manifest&url=${encodeURIComponent(manifest)}`;
  document.getElementById("release").href = `${repository}/releases/tag/${tag}`;
  document.getElementById("message").textContent = "Install the exact build linked from your review.";
  document.getElementById("build").hidden = false;
  document.title = `Halal Stocks — build ${buildNumber}`;

  const pullRequest = parameters.get("pr") || "";
  if (/^[1-9]\d*$/.test(pullRequest)) {
    document.getElementById("context").textContent = `PULL REQUEST #${pullRequest}`;
    const back = document.getElementById("pull-request");
    back.href = `https://github.com/qalandarov/stocker/pull/${pullRequest}`;
    back.hidden = false;
  }
} else if (tag) {
  document.getElementById("message").textContent =
    "This build link is incomplete or invalid. Open the install link from the original pull request comment.";
}
