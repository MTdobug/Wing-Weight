export function configurarToggleSenha() {
    const botoesToggle = document.querySelectorAll('.toggle-senha');
    if (!botoesToggle.length) return;
  
    botoesToggle.forEach(botao => {
      botao.addEventListener('click', () => {
        const campoSenha = botao.previousElementSibling;
        const tipo = campoSenha.getAttribute('type') === 'password' ? 'text' : 'password';
        campoSenha.setAttribute('type', tipo);
        botao.classList.toggle('fa-eye');
        botao.classList.toggle('fa-eye-slash');
      });
    });
  }
  