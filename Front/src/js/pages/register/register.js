import { hidePreloader } from '../../global/global.js';
import { configurarToggleSenha } from '../../global/global.js';
import { setupRegisterForm } from './partials/registerform.js';

document.addEventListener('DOMContentLoaded', () => {
    hidePreloader();
    configurarToggleSenha();
    setupRegisterForm();
    
});