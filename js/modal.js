document.addEventListener('DOMContentLoaded', (event) => {
    let modal = document.getElementById("myModal");
    let span = document.getElementsByClassName("close")[0];

    // Abre o modal
    modal.style.display = "block";

    // Fecha o modal quando o usuário clica no "X"
    span.onclick = function() {
      modal.style.display = "none";
    };

    // Fecha o modal se o usuário clica fora do modal
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    };
});
