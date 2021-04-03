const $root = document.querySelector('#root');

const LOGIN = 'login';
const REGISTER = 'register';

const screens = {
    login: {
        screen: 'login',
        title : 'Realizar Login',
        helperText : 'Ainda não possui conta?',
        buttonText : 'Entrar',
    },
    register: {
        screen: 'register',
        title : 'Criar Conta',
        helperText : 'Já possui uma conta?',
        buttonText : 'Registrar',
    }
}


function toggleScreen(current = LOGIN) {
    $root.innerHTML = '';
    if(current === REGISTER){
        return render(LOGIN)
    }

    render(REGISTER);
}

function render(key){

    const { screen, title, helperText, buttonText } = screens[key];
    const $container = retryOrCreateElement('div', {
        className: 'container',
        selector: '.container',
        id: screen
    });


    $root.appendChild($container);
    const $box = retryOrCreateElement('div', {
        className: 'box',
    });
    $container.appendChild($box);

    const $header = retryOrCreateElement('header');
    const $title = retryOrCreateElement('div', {
        className: 'title',
        innerText: title
    });

    $header.append($title);

    const $logo_wrapper = retryOrCreateElement('div', {
        className: 'logo-wrapper'
    });

    const $logo = retryOrCreateElement('img', {
        src: key === REGISTER ? 'images/logo-white.svg' : 'images/logo.svg'
    })

    $logo_wrapper.appendChild($logo);
    $header.appendChild($logo_wrapper);
    $box.appendChild($header)

    const $form  = retryOrCreateElement('form');
    $box.appendChild($form);

    const $username = retryOrCreateElement('input', {
        className: 'form-input username',
        selector: '.username',
        type: 'email',
        placeholder: 'Digite sua e-mail...'
    });

    const $password = retryOrCreateElement('input', {
        className: 'form-input password',
        selector: '.password',
        type: 'password',
        placeholder: 'Digite sua senha...'
    });

    const helper = retryOrCreateElement('small',{
        innerText: helperText + ' Clique '
    });

    const $bottom = retryOrCreateElement('div', {
        className: 'bottom'
    })
    const $link = retryOrCreateElement('a', {
        innerText: 'aqui'
    });
    $link.addEventListener('click', ()=> toggleScreen(key));
    helper.append($link);



    const $button = retryOrCreateElement('button',{
        className: 'btn',
        innerText: buttonText
    })
    $bottom.appendChild(helper);
    $bottom.appendChild($button);

    $form.appendChild($username);
    $form.appendChild($password);
    $form.appendChild($bottom);

}


function retryOrCreateElement(tagName, props = { selector : null }, options = null){
    let $element = document.querySelector(props.selector);
    if($element) {
        return $element;
    }

    $element = document.createElement(tagName, options);
    Object.keys(props).forEach( key => {
        $element[key] = props[key];
    });

    return $element;
}

// Start screen: Login
render(REGISTER);