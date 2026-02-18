
export const defaultUser = { nombre: 'Usuario', tab: 'Inicio' };

export class userSettings {
  static newUser({nombre}) {
    // TODO:
    // un solo usuario?
    // contraseña ?
    // comprobar q no se repita el nombre.
    localStorage.setItem('usuario', JSON.stringify({...defaultUser, nombre}));
  }

  static getUser() {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (!usuarioGuardado) {
      localStorage.setItem('usuario', JSON.stringify(defaultUser));
      return defaultUser;
    } else {
      return usuarioGuardado;
    }
  }

  static editUser({newName, newTab}) {
    const {nombre, tab} = this.getUser();

    if (newName) {
      localStorage.setItem('usuario', JSON.stringify({nombre: newName, tab}));
    }
    if (newTab) {
      localStorage.setItem('usuario', JSON.stringify({nombre, tab: newTab}));
    }
  }

  static removeUser({nombre}) {
    localStorage.removeItem(nombre);
  }

  static clearAllUsers() {
    localStorage.clear();
    console.log("Usuarios Borrados!")
  }

}