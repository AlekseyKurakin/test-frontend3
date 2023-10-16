In case if you want to work with mock data. In DiagnoseFormComponent file replace
diagnoses: IDiagnose[];
to
diagnoses: IDiagnose[] = mockData;

In case if you want to work with proxy server, change url and path in these services: 'diagnoses.service', 'global.service'
