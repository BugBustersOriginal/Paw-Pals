const dbSet = (user, database, password, host) => (
    {
      user,
      host,
      database,
      password,
      port: 5432
    }
);
module.exports=dbSet;