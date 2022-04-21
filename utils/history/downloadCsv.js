import { convertArrayToCSV } from 'convert-array-to-csv';

export const downloadCsv = (harvests, region = 'id-ID') => {
  /**
   * region 'id-ID' | 'en-US'
   */

  const listDelimiter = {
    'id-ID': ';',
    'en-US': ',',
  };

  const now = new Date();
  const date = new Intl.DateTimeFormat(region).format(now);
  const data = harvests.map((harvest, index) => {
    return {
      no: index + 1,
      nama: harvest.nama,
      absen: harvest.absen,
      divisi: harvest.divisi,
      nama_krani: harvest.nama_krani,
      tanggal: date,
      matang: new Intl.NumberFormat(region).format(harvest.matang),
      mengkal: new Intl.NumberFormat(region).format(harvest.mengkal),
      mentah: new Intl.NumberFormat(region).format(harvest.mentah),
      lewat_matang: new Intl.NumberFormat(region).format(harvest.lewat_matang),
      busuk: new Intl.NumberFormat(region).format(harvest.busuk),
      tangkai_panjang: new Intl.NumberFormat(region).format(harvest.tangkai),
      jumlah: new Intl.NumberFormat(region).format(harvest.jumlah),
      brondolan: new Intl.NumberFormat(region).format(harvest.brondolan),
    };
  });
  const csvData =
    'data:text/csv;charset=utf-8,' +
    convertArrayToCSV(data, { separator: listDelimiter[region] || ',' });

  const encodedUri = encodeURI(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'allmbs-' + date);
  document.body.appendChild(link);
  link.click();
};
