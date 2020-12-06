import connection from '../database/connection';

export async function select(req) {
  const {
    table,
    data = [],
    filter = [],
    select = '*',
    orderColumn = 'createdAt',
    orderDir = 'ASC',
    limit = -1,
  } = req;
  let query = '';
  try {
    if (data) {
      if (filter) {
        if (filter.type === 'notEqual') {
          query = await connection(table)
            .where(data)
            .whereNot(filter.data)
            .select(select)
            .limit(limit)
            .orderBy(orderColumn, orderDir);
        } else if (filter.type === 'others') {
          query = await connection(table)
            .where(data)
            .andWhere(filter.column, filter.condition, filter.value)
            .select(select)
            .limit(limit)
            .orderBy(orderColumn, orderDir);
        } else {
          query = await connection(table)
            .where(data)
            .select(select)
            .limit(limit)
            .orderBy(orderColumn, orderDir);
        }
      } else {
        query = await connection(table)
          .where(data)
          .select(select)
          .limit(limit)
          .orderBy(orderColumn, orderDir);
      }
    } else if (filter) {
      if (filter.type === 'notEqual') {
        query = await connection(table)
          .whereNot(filter.data)
          .select(select)
          .limit(limit)
          .orderBy(orderColumn, orderDir);
      } else if (filter.type === 'others') {
        query = await connection(table)
          .andWhere(filter.column, filter.condition, filter.value)
          .select(select)
          .limit(limit)
          .orderBy(orderColumn, orderDir);
      } else {
        query = await connection(table)
          .select(select)
          .limit(limit)
          .orderBy(orderColumn, orderDir);
      }
    } else {
      query = await connection(table)
        .select(select)
        .limit(limit)
        .orderBy(orderColumn, orderDir);
    }
  } catch (er) {
    return { error: er };
  }
  // console.log( query );
  return query;
}

export async function quantity(req) {
  const { table, column, nameCount = 'qtde' } = req;
  try {
    return await connection(table).count(column, { as: nameCount });
  } catch (er) {
    return { error: er };
  }
}

export async function sum(req) {
  const { table, column, nameCount = 'qtde' } = req;
  try {
    return await connection(table).sum(column, { as: nameCount });
  } catch (er) {
    return { error: er };
  }
}

export async function insert(req, res) {
  const { table, data } = req;

  let resp;

  try {
    resp = await connection(table)
      .insert(data)
      .catch(function (error) {
        return res.status(400).send(error);
      });

    if (!resp) {
      return { error: 'Problema ao salvar' };
    }
  } catch (er) {
    return { error: er };
  }

  return res.status(200).json(resp);
}

export async function update(req, res) {
  const { table, select, data } = req;
  let resp;
  try {
    resp = await connection(table).where(select).update(data);
  } catch (er) {
    return res.json(er);
  }
  return res.json(resp);
}

export async function remove(req) {
  const { table, data } = req;

  const query = await connection(table)
    .where(data)
    .delete()
    .catch(err => {
      return err;
    });

  if (!query) {
    return { error: 'Usuario não localizado' };
  }
  return { status: 'ok' };
}
