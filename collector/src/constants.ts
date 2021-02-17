export const ercotURL = `http://www.ercot.com/content/cdr/html/real_time_system_conditions.html`
export const keyMappings: Record<string, string> = {
  'Current Frequency': 'cfr',
  'Instantaneous Time Error': 'ite',
  'Consecutive BAAL Clock-Minute Exceedances (min)': 'baal',
  'Actual System Demand': 'demand',
  'Total System Capacity (not including Ancillary Services)': 'capacity',
  'Total Wind Output': 'windout',
  'Total PVGR Output': 'pvgrout',
  'Current System Inertia': 'inertia',
  'DC_E (East)': 'tfdce',
  'DC_L (Laredo VFT)': 'tfdcl',
  'DC_N (North)': 'tfdcn',
  'DC_R (Railroad)': 'tfdcr',
  'DC_S (Eagle Pass)': 'tfdcs',
}
