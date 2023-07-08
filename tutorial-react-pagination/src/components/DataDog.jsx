/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./DataDog.css";

// eslint-disable-next-line react/prop-types
const DataDog = ({ datas }) => {
  //   Mmembuat state untuk menentukan nilai awal dari data yang ditampilkan dengan value 0
  const [itemOffset, setItemOffset] = useState(0);
  //   Membuat state pageCount untuk menghitung jumlah data yg didapat dari api
  const [pageCount, setPageCount] = useState(0);
  //   Membuat state untuk menampung hasil data dari api yg dipars dari props,dan sudah menghitung dari bnyaknya data yang ditemukan lalu dibagi dengan data yang ingin ditampilkan
  const [currentItems, setCurrentItems] = useState([]);

  // Buat variabel untuk menampung jumlah data yang ditampilkan perpage
  const itemsPerPage = 6;

  // Gunakan useState dan dependency-nya yang berubah,jika saat data berpindah halaman
  useEffect(() => {
    // Membuat variabel untuk menampung hasil halaman yang ingin dtampil,INGAT itemOffset akan selalu berubah(state), dan itemsPerPage akan selalu menambahkan 10
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);

    // gunakan slice(method array) untuk memotong array yg dikrim props hasil get api,Slice mempunyai 2 parameter(indexAwalArray,indexAkhirArray),Yang hasilnya nanti akan dimap ditampilkan ke UI
    setCurrentItems(datas.slice(itemOffset, endOffset));

    setPageCount(Math.ceil(datas.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, datas]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % datas.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  function handleDetail(id) {
    alert("id data yang anda klik : " + id);

    // lakukan hit api lagi sesuai dengan id
  }
  return (
    <>
      <div className="wrapper-card">
        <ul>
          {currentItems.map((item) => {
            return (
              <li key={item.id}>
                <div className="wrapper-img">
                  <img src={item.image.url} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <div className="deskripsi-card">
                  <p>Keterangan</p>
                  <span>
                    Live : <b>{item.life_span}</b>
                  </span>
                  <span>
                    Jenis : <b>{item.bred_for}</b>
                  </span>
                  <span>
                    Temperament : <b>{item.temperament}</b>
                  </span>
                </div>
                <button onClick={() => handleDetail(item.id)}>Show Details</button>
              </li>
            );
          })}
        </ul>
      </div>
      <ReactPaginate
        breakLabel="" // untuk mengatur jarak antar page dengan halaman page selanjutnya
        nextLabel="next >" // untuk mengatur tulisan pada button next
        onPageChange={handlePageClick} // function untuk berpindah halaman
        marginPagesDisplayed={0} // Untuk mensetting jarak antara RANGEPAGEDISPLAYED yg sudah ditentukan PENTING DATA PALING AKHIR
        pageRangeDisplayed={7} // untuk mengatur berapa items(indikator) yg ditampilkan (TAMPILAN INIDKATOR AWAL)
        pageCount={pageCount} // membatasi sesuai dengan page count
        previousLabel="< previous" // untuk mengatur tulisan pada button previous
        renderOnZeroPageCount={null}
        containerClassName="containerPaginate" // untuk memberi className pada container pagination (yaitu tag ul)
        pageLinkClassName="linkPaginate" // untuk memberi className pada items(indikator) (yaitu a)
        activeLinkClassName="linkActivePaginate" //untuk memberi className items(indikator) yg aktif(yaitu element a)
        previousLinkClassName="previusLinkPaginate" // Untuk memberi class name button a pada tombol previous
        nextLinkClassName="nextLinkPaginate" // Untuk memberi class name button a pada tombol next
        // class name bisa diberi LEBIH DARI SATU
      />
    </>
  );
};
export default DataDog;
