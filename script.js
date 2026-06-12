const commands = [
  "buy --syntholguy",
  "scan --community-signal",
  "watch --drop-sequence",
  "verify --no-empty-hype"
];

const target = document.querySelector("#typed-command");
const terminalResponse = document.querySelector("#terminal-response");
const terminalButtons = document.querySelectorAll("[data-terminal-command]");
let commandIndex = 0;
let charIndex = 0;
let deleting = false;

const terminalResponses = {
  status: [
    "status: pre-launch",
    "buy: unavailable yet",
    "next: follow official X"
  ],
  links: [
    "official site: this page",
    "official X: x.com/syntholguyonsol",
    "anything else: ignore"
  ],
  contract: [
    "contract: pending",
    "copy only from this site or X",
    "DM contract links are fake until proven official"
  ],
  risk: [
    "memecoin = high risk",
    "no financial advice",
    "do your own research before launch"
  ]
};

function tickTerminal() {
  if (!target) return;

  const command = commands[commandIndex];
  target.textContent = command.slice(0, charIndex);

  if (!deleting && charIndex < command.length) {
    charIndex += 1;
    setTimeout(tickTerminal, 78);
    return;
  }

  if (!deleting && charIndex === command.length) {
    deleting = true;
    setTimeout(tickTerminal, 1200);
    return;
  }

  if (deleting && charIndex > 0) {
    charIndex -= 1;
    setTimeout(tickTerminal, 38);
    return;
  }

  deleting = false;
  commandIndex = (commandIndex + 1) % commands.length;
  setTimeout(tickTerminal, 260);
}

tickTerminal();

terminalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.dataset.terminalCommand;
    const lines = terminalResponses[command];

    if (!terminalResponse || !lines) return;

    terminalResponse.innerHTML = lines
      .map((line) => `<p><span class="prompt">&gt;</span> ${line}</p>`)
      .join("");
  });
});
