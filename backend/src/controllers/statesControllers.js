const connection = require('../database/connection').default;

module.exports = {
  async index(request, response) {
    const ads = await connection('states').select('*');
    return response.json(ads);
  },

  async create(request, response) {
    const { nameState, ufState } = request.body;
    const resp = await connection('states').insert({
      nameState,
      ufState,
    });

    return response.json(resp);
  },

  async update(request, response) {
    return response.status(200).json({ message: 'ok' });
  },

  async remove(request, response) {
    const { idState } = request.query;
    const state_id = await connection('states')
      .where('idState', idState)
      .select('idState')
      .first();

    if (!state_id) {
      return response.status(401).json({ erro: 'Estado não encontrado' });
    }

    await connection('states').where('idState', idState).delete();
    return response.status(204).send();
  },
};
