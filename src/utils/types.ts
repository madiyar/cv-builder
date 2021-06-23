export interface IResume {
  id: string,
  name: string,
  date: number
};

export interface IContext {
  store: IResume[],
  create({ name } : { name?: string }): void,
  get(id : string): IResume | undefined,
  save(data : IResume): void,
  remove(id : string): void,
  duplicate(data : IResume): void
};
