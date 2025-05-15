import { hidePreloader } from '../../global/global.js';
import { configurarToggleSenha } from '../../global/global.js';
import { setupLoginValidation } from './partials/login.js';

document.addEventListener('DOMContentLoaded', () => {
    hidePreloader();
    configurarToggleSenha();
    setupLoginValidation();

});
