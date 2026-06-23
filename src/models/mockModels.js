const bcrypt = require('bcryptjs');

const users = [];
const customers = [];

const seedAdmin = () => {
  const adminExists = users.some((u) => u.email === 'admin');
  if (!adminExists) {
    users.push({
      _id: '1',
      name: 'Admin',
      email: 'admin',
      password: bcrypt.hashSync('admin', 10),
      role: 'admin',
    });
  }
};

seedAdmin();

const create = async ({ name, email, password, role }) => {
  const user = {
    _id: String(users.length + 1),
    name, email, password, role: role || 'user',
  };
  users.push(user);
  return user;
};

const findOne = async (query) => {
  if (query._id) return users.find(u => u._id === query._id) || null;
  if (query.email) return users.find(u => u.email === query.email) || null;
  return null;
};

const findById = async (id) => users.find(u => u._id === id) || null;

const select = (fields) => ({
  exec: async () => {
    const u = users.find(u => u._id === fields) || null;
    if (!u) return null;
    const { password, ...rest } = u;
    return rest;
  },
});

const hash = async (pw) => require('bcryptjs').hash(pw, 10);
const compare = async (pw, hashed) => require('bcryptjs').compare(pw, hashed);

module.exports = {
  User: {
    create: async (data) => {
      const user = {
        _id: String(users.length + 1),
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'user',
      };
      users.push(user);
      return user;
    },
    findOne: async (query) => {
      if (query.email) return users.find(u => u.email === query.email) || null;
      if (query._id) return users.find(u => u._id === query._id) || null;
      return null;
    },
    findById: async (id) => {
      const u = users.find(u => u._id === id) || null;
      if (!u) return null;
      const { password, ...rest } = u;
      return { ...rest, select: (f) => ({ exec: async () => ({ ...rest }) }) };
    },
  },
  Customer: {
    find: async () => [...customers],
    findById: async (id) => customers.find(c => c._id === id) || null,
    findByIdAndUpdate: async (id, update) => {
      const idx = customers.findIndex(c => c._id === id);
      if (idx === -1) return null;
      customers[idx] = { ...customers[idx], ...update };
      return customers[idx];
    },
    findByIdAndDelete: async (id) => {
      const idx = customers.findIndex(c => c._id === id);
      if (idx === -1) return null;
      const deleted = customers.splice(idx, 1)[0];
      return deleted;
    },
    create: async (data) => {
      const c = { _id: String(customers.length + 1), ...data };
      customers.push(c);
      return c;
    },
    getStats: async () => {
      const totalCustomers = customers.length;
      const pendingOnboarding = customers.filter(c => c.status === 'pending').length;
      const completedOnboarding = customers.filter(c => c.status === 'completed').length;
      return { totalCustomers, pendingOnboarding, completedOnboarding };
    },
  },
};
