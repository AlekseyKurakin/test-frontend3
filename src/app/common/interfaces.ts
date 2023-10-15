export interface IDiagnose {
  id: number,
  chapterNumber: string,
  chapterName: string,
  blockNumber: string,
  blockName: string,
  code: string,
  name: string,
  shortName: string,
  isPublic: boolean
}

export interface IResultJson {
  encounter: {
    date: string
  },
  conditions?: ICondition[]
}

export interface ICondition {
  id: string,
  onset_date: string
  context: {
    identifier: {
      type: {
        coding: [
          {
            system: string,
            code: string
          }
        ]
      },
      value: string
    }
  },
  code: {
    coding: [
      {
        system: string,
        code: string
      }
    ]
  },
  notes?: string,
}
