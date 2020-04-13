export interface WikiParseResponse {
  parse: Parse;
}
export interface Parse {
  title: string;
  pageid: number;
  revid: number;
  text: Text;
  langlinks?: LanglinksEntity[] | null;
  categories?: CategoriesEntity[] | null;
  links?: LinksEntity[] | null;
  templates?: TemplatesEntity[] | null;
  images?: string[] | null;
  externallinks?: string[] | null;
  sections?: SectionsEntity[] | null;
  parsewarnings?: null[] | null;
  displaytitle: string;
  iwlinks?: IwlinksEntity[] | null;
  properties?: PropertiesEntity[] | null;
}

export interface Text {
  "*": string;
}
export interface LanglinksEntity {
  lang: string;
  url: string;
  langname: string;
  autonym: string;
  "*": string;
}
export interface CategoriesEntity {
  sortkey: string;
  hidden?: string | null;
  "*": string;
}
export interface LinksEntity {
  ns: number;
  exists?: string | null;
  "*": string;
}
export interface TemplatesEntity {
  ns: number;
  exists: string;
  "*": string;
}
export interface SectionsEntity {
  toclevel: number;
  level: string;
  line: string;
  number: string;
  index: string;
  fromtitle: string;
  byteoffset: number;
  anchor: string;
}
export interface IwlinksEntity {
  prefix: string;
  url: string;
  "*": string;
}
export interface PropertiesEntity {
  name: string;
  "*": string;
}

export interface WikiError {
  error: Error;
  servedby: string;
}
export interface Error {
  code: string;
  info: string;
  "*": string;
}
