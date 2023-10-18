export function GetSession() {
    if (typeof sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
            return JSON.parse(token);
        } else {
            return null;
        }
    }
}

export function GetUserEmail() {
    if (typeof sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
            return JSON.parse(token).user.email;
        } else {
            return null;
        }
    }
}

export function GetLogOut() {
    if (typeof sessionStorage !== 'undefined') {
        const token = sessionStorage.getItem('token');
        if (token) {
            sessionStorage.removeItem('token');
            alert('Logout successful');
            window.location.reload();
        }
    }
}