import { convertArrayToCSV } from 'convert-array-to-csv';

export const downloadCsv = (harvests) => {
  const now = new Date();
  const date = new Intl.DateTimeFormat('id-ID').format(now);
  const data = harvests.map((harvest, index) => {
    return {
      no: index + 1,
      nama: harvest.nama,
      absen: harvest.absen,
      divisi: harvest.divisi,
      nama_krani: harvest.nama_krani,
      tanggal: date,
      matang: harvest.matang,
      mengkal: harvest.mengkal,
      mentah: harvest.mentah,
      abnormal: harvest.abnormal,
      busuk: harvest.busuk,
      jumlah: harvest.jumlah,
      brondolan: harvest.brondolan,
    };
  });
  const csvData = 'data:text/csv;charset=utf-8,' + convertArrayToCSV(data);

  const encodedUri = encodeURI(csvData);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'allmbs-' + date);
  document.body.appendChild(link);
  link.click();
};
