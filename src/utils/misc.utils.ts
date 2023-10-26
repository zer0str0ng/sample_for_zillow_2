export const isMockMode = () => process.env.MOCK_MODE?.toLowerCase() === 'true';

export const isReportMode = () => process.env.REPORT_MODE?.toLowerCase() === 'true';
