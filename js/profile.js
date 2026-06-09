document.addEventListener("DOMContentLoaded", () => {
  const toastPerfil = document.getElementById("toast-perfil");
  const botoesEditar = document.querySelectorAll(
    ".btn-editar, .btn-editar-avatar",
  );
  const btnAgendar = document.querySelector(".btn-agendar");

  let toastTimeoutId;

  const mostrarToast = (mensagem) => {
    toastPerfil.querySelector("span").textContent = mensagem;
    toastPerfil.classList.add("mostrar");

    clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
      toastPerfil.classList.remove("mostrar");
    }, 2200);
  };

  botoesEditar.forEach((botao) => {
    botao.addEventListener("click", () => {
      const campo = botao.getAttribute("data-campo");

      if (campo === "senha") {
        mostrarToast("Função de alteração de senha iniciada.");
        return;
      }

      if (campo) {
        mostrarToast(`Edição de ${campo} iniciada.`);
        return;
      }

      mostrarToast("Edição da foto de perfil iniciada.");
    });
  });

  btnAgendar?.addEventListener("click", (event) => {
    event.preventDefault();
    mostrarToast("Redirecionando para agendamento.");
  });
});
