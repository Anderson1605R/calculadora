const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
let resultInput = document.getElementById("result");
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

// faz um forEach na classe de botoes para torna-los usáveis
document.querySelectorAll(".charKey").forEach((charKeyBtn) => {
  charKeyBtn.addEventListener("click", () => {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

document.getElementById("clear").addEventListener("click", () => {
  input.value = "";
  input.focus();
});

// funcionalidade do botão igual
document.getElementById("equal").addEventListener("click", calculate);

// funcionalidade de mudança de tema
document.getElementById("themeSwitcher").addEventListener("click", () => {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

// funcionalidade de copia de resultado
document.getElementById("copyToClipboard").addEventListener("click", (e) => {
  const button = e.currentTarget;
  if (button.innerText === "Copy") {
    button.innerText = "Copied";
    button.classList.add("success");
    navigator.clipboard.writeText(resultInput.value);
  } else {
    button.innerText = "Copy";
    button.classList.remove("success");
    resultInput.value = "";
  }
});

input.addEventListener("keydown", (e) => {
  // previne que qualquer tecla do evento keydown seja impressa
  e.preventDefault();

  // Verifica se a tecla clicada está no array de caracteres permitidos
  if (allowedKeys.includes(e.key)) {
    // e.key é a tecla que está sendo apertada
    input.value += e.key;
    return;
  }
  // aqui fazemos a funcionalidade do backspace
  if (e.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }
  if (e.key === "Enter") {
    calculate();
  }
});

function calculate() {
  resultInput.value = "ERROR";
  resultInput.classList.add("error");

  const resultado = eval(input.value);

  resultInput.value = resultado;
  resultInput.classList.remove("error");
}
