export async function validateLogin() {
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value.trim();

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: usuario, senha })
    });

    const result = await response.json();

    if (response.ok) {
      return { sucesso: true, dados: result.usuario };
    } else {
      return { sucesso: false, mensagem: result.mensagem || 'Erro de login' };
    }
  } catch (error) {
    console.error(error);
    return { sucesso: false, mensagem: 'Erro ao conectar com o servidor.' };
  }
}

// Configura o evento de login
export function setupLoginValidation() {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const result = await validateLogin();

    if (result.sucesso) {
      console.log('Login bem-sucedido:', result.dados);
      window.location.href = 'home.html';
    } else {
      document.getElementById('usuario').classList.add('input-error');
      document.getElementById('senha').classList.add('input-error');
      document.getElementById('error-usuario').innerText = result.mensagem;
      document.getElementById('error-usuario').style.display = 'block';
      document.getElementById('error-usuario').style.color = 'var(--red)';
    }
  });
}