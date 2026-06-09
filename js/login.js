document.addEventListener("DOMContentLoaded", () => {
  const cpfInput = document.getElementById("cpf");
  const formLogin = document.getElementById("form-login");
  const toastSucesso = document.getElementById("toast-sucesso");
  const somSucesso = document.getElementById("som-sucesso");

  cpfInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");

    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    e.target.value = value;
  });

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    if (cpfInput.value.length !== 14) {
      alert("Por favor, digite um CPF válido.");
      return;
    }

    somSucesso.play().catch((erro) => {
      console.log(
        "O navegador bloqueou o áudio ou o arquivo não foi encontrado.",
        erro,
      );
    });

    toastSucesso.classList.add("mostrar");

    setTimeout(() => {
      toastSucesso.classList.remove("mostrar");

      window.location.href = "./profile.html";
      cpfInput.value = "";
    }, 3500);
  });
});
