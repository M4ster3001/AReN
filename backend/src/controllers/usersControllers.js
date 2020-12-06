import crypto from 'crypto';
import bCrypt from 'bcrypt';
import connection from '../database/connection';

const salts = 12;
const TABLE = 'users';

module.exports = {
  async login(request, response) {
    let { login_email, login_password } = request.body;
    login_email = login_email.trim();

    if (!login_email || !login_password) {
      return response.json({
        error: 'Ocorreu um problema ao logar, tente novamente',
      });
    }

    try {
      await connection(TABLE)
        .where({ email: login_email })
        .select('idUser', 'password')
        .first()
        .then(async resp => {
          if (!resp) {
            return response.json({ error: 'Usuário não localizado' });
          }
          if (!bCrypt.compareSync(login_password, resp.password)) {
            return response.json({ error: 'Login ou senha inválidos' });
          }

          const token = crypto.randomBytes(12).toString('HEX');
          const query = await connection(TABLE)
            .where('idUser', resp.idUser)
            .update({ token });

          if (!query) {
            return response.json({
              error: 'Ocorreu um erro no acesso código 3',
            });
          }

          return response.json({ token });
        })
        .catch(e => {
          return response.json({ error: e });
        });
    } catch (er) {
      return response.json(er);
    }
  },

  async index(request, response) {
    const users = await connection(TABLE).select('*');
    return response.json(users);
  },

  async create(request, response) {
    let { name, email, idState, password } = request.body;
    const flg_ativo = 1;
    const token = crypto.randomBytes(12).toString('HEX');

    password = bCrypt.hashSync(password, salts);
    email = email.trim();

    try {
      await connection(TABLE).insert({
        name,
        email,
        idState,
        password,
        token,
        flg_ativo,
      });
    } catch (er) {
      return response.json(er);
    }

    return response.json(token);
  },

  async update() {},

  async remove(request, response) {
    const { idUser } = request.query;
    try {
      const query = await connection(TABLE)
        .where({ idUser })
        .delete()
        .catch(err => {
          return response.json(err);
        });

      if (!query) {
        return response.json({ error: 'Usuario não localizado' });
      }
    } catch (er) {
      return response.json(er);
    }

    return response.status(204).send();
  },
};
