export interface StateData {
    [stateCode: string]: {
      death: number;
      positiveCasesViral:number;
      negativeRegularScore:number;
      recovered:number;
    };
  }