class Config {
    
  //db
  private readonly dbhost = process.env.dbhost || 'localhost';
  private readonly dbusername = process.env.dbusername || '';
  private readonly dbpassword = process.env.dbpassword || '';
  private readonly dbname = process.env.dbname || 'test-dev';
  private readonly dbsource = process.env.dbsource || 'admin';
  public get config(): any {
    return this;
  }

}
export default new Config().config;