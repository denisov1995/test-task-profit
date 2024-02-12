import './styles/styles.scss'
let login = false

export const logged = (value) => {
    login = value
}

export const isLogged = () => {
    return login
}

const router = {
    '/': async () => {
        const home = await import('./components/home/home.js');
        home.render();
    },
    '/about': async () => {
        const about = await import('./components/about/about.js');
        about.render();
    },
    '/login': async () => {
        const contact = await import('./components/login/login.js');
        contact.render();
    },
};

export const loadPage = async (path) => {
    const app = document.querySelector('.content');
    const response = await fetch(path);
    const text = await response.text();
    app.innerHTML = text;
};

const navList = document.querySelector('.nav-list');
const logOutBtn = document.querySelector('.log-out')
const logIntBtn = document.getElementById('log-in')


navList.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
        e.preventDefault();

        if (login) {
            const url = e.target.getAttribute('href');
            routeTo(url)
        } else {
            alert("Залогинетесь")
        }
    }
});

function handleHashChange() {
    let username = localStorage.getItem("username");
    if (localStorage.getItem("status")) {
        login = true
        console.log("Welcome back, " + username);
    } else {
        // Если нет, значит пользователь не залогинен
        console.log("Please log in");
    }

    if (login) {
        logOutBtn.style.display = "block"
        logIntBtn.style.display = "block"
    } else {
        logIntBtn.style.display = "none"
        logOutBtn.style.display = "none"
    }

    const hash = window.location.pathname
    if (router[hash] && login) {
        router[hash]();
    } else {
        history.pushState(null, null, "/login");
        router['/login']();
    }
};

function logOut() {
    login = false
    routeTo('./login')
}

function routeTo(url) {
    const state = {};
    history.pushState(state, '', url);

    const popStateEvent = new PopStateEvent('popstate', { state: state });
    dispatchEvent(popStateEvent);
}

logOutBtn.addEventListener('click', () => {
    localStorage.removeItem("status");
    logOut()
});

window.addEventListener('popstate', handleHashChange);

handleHashChange();
