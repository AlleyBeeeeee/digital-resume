document.addEventListener("DOMContentLoaded", () => {
  const modeToggle = document.getElementById("modeToggle");
  modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("terminal-mode");
    modeToggle.textContent = document.body.classList.contains("terminal-mode")
      ? "core.sys"
      : "shift matrix";
  });

  // --- CONSOLE RE-RENDER MATRIX ---
  const consoleInput = document.getElementById("console-input");
  const consoleOutput = document.getElementById("console-output");

  const commandToLogMap = {
    summary: "log-summary",
    skills: "log-skills",
    projects: "log-projects",
    experience: "log-experience",
    education: "log-education",
    contact: "log-contact",
    photo: "log-photo",
  };

  const foundAssets = new Set();
  let isTokenCracked = false;

  function processCommand(input) {
    const command = input.trim().toLowerCase();

    consoleOutput.innerHTML += `guest@blandon.net:~# ${command}\n`;

    if (command === "help") {
      consoleOutput.innerHTML += `[info] standard modules: 'summary', 'skills', 'projects', 'experience', 'education'. \n[warning] 'contact' and 'photo' nodes remain hard-encrypted under 2FA policy.\n`;
    } else if (command === "status") {
      const foundCount = foundAssets.size;
      const totalAssets = Object.keys(commandToLogMap).length;
      consoleOutput.innerHTML += `[status] index triage: [${foundCount}/${totalAssets}] modules mounted. 2FA Status: ${isTokenCracked ? "BYPASSED" : "LOCKED"}\n`;
    } else if (command === "bypass") {
      isTokenCracked = true;
      consoleOutput.innerHTML += `[SUCCESS] > 2FA authentication match found. Security override validated.\n[system] > nodes://contact and nodes://photo are now initialized for retrieval.\n`;
    } else if (command === "contact" || command === "photo") {
      if (!isTokenCracked) {
        consoleOutput.innerHTML += `[SECURITY ERROR] > Access Denied. Node is locked behind 2FA encryption. Find the alphanumeric token inside the 'projects' module logs and input it here first.\n`;
      } else {
        foundAssets.add(command);
        const targetId = commandToLogMap[command];
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.classList.remove("hidden");
          consoleOutput.innerHTML += `[clear] clearance confirmed. loading node://${command} target frame.\n`;
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    } else if (commandToLogMap[command]) {
      foundAssets.add(command);
      const targetId = commandToLogMap[command];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.classList.remove("hidden");
        consoleOutput.innerHTML += `[clear] verified block. revealing node://${command} below console.\n`;
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else {
      consoleOutput.innerHTML += `[error] entry '${command}' unmapped or unauthorized. type 'help' for paths.\n`;
    }

    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  }

  consoleInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      processCommand(consoleInput.value);
      consoleInput.value = "";
    }
  });
});
