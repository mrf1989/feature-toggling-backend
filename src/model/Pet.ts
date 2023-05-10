export interface InputPet {
  id: number,
  name: string,
  birth: string,
  category: { id: number, name: string },
  race: string,
  photo?: string,
  history?: {
    id: number,
    date: string,
    comments: string
  }[],
  inHostal: boolean,
  owner: number
}

export type OutputPet = Omit<InputPet, "category"> & {
  category: { name: string };
};
