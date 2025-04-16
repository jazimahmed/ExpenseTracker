export const downloadCSV = (data, filename = 'expenses.csv') => {
    if (!data || data.length === 0) return;
  
    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(','), // header row
      ...data.map(row =>
        headers.map(field => JSON.stringify(row[field] ?? '')).join(',')
      ),
    ];
  
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  
    URL.revokeObjectURL(url);
  };
  