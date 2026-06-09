document.addEventListener("DOMContentLoaded", () => {
  const nomeInput = document.getElementById("nome");
  const telefoneInput = document.getElementById("telefone");
  const cpfInput = document.getElementById("cpf");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const formRegister = document.getElementById("form-register");
  const toastSucesso = document.getElementById("toast-sucesso");
  const somSucesso = document.getElementById("som-sucesso");

  const formatCpf = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 11);

    digits = digits.replace(/(\d{3})(\d)/, "$1.$2");
    digits = digits.replace(/(\d{3})(\d)/, "$1.$2");
    digits = digits.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    return digits;
  };

  const formatTelefone = (value) => {
    let digits = value.replace(/\D/g, "").slice(0, 11);

    digits = digits.replace(/^(\d{2})(\d)/, "($1) $2");
    digits = digits.replace(/(\d{4,5})(\d{4})$/, "$1-$2");

    return digits;
  };

  cpfInput.addEventListener("input", (event) => {
    event.target.value = formatCpf(event.target.value);
  });

  telefoneInput.addEventListener("input", (event) => {
    event.target.value = formatTelefone(event.target.value);
  });

  formRegister.addEventListener("submit", (event) => {
    event.preventDefault();

    const cpfDigits = cpfInput.value.replace(/\D/g, "");
    const telefoneDigits = telefoneInput.value.replace(/\D/g, "");

    if (nomeInput.value.trim().length < 3) {
      alert("Por favor, digite seu nome completo.");
      nomeInput.focus();
      return;
    }

    if (telefoneDigits.length < 10 || telefoneDigits.length > 11) {
      alert("Por favor, digite um telefone válido.");
      telefoneInput.focus();
      return;
    }

    if (cpfDigits.length !== 11) {
      alert("Por favor, digite um CPF válido.");
      cpfInput.focus();
      return;
    }

    if (!emailInput.checkValidity()) {
      alert("Por favor, digite um email válido.");
      emailInput.focus();
      return;
    }

    if (senhaInput.value.trim().length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      senhaInput.focus();
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
      window.location.href = "./login.html";
      formRegister.reset();
    }, 3500);
  });
});
