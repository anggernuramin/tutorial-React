import axios from "axios";
import { useEffect, useState } from "react";

// INTERCEPTOR
//    Adalah fungsi yang dapat digunakan untuk MANIPULASI PERMINTAAN(request) atau RESPONSE sebelum atau setelah mereka dikirim atau diterima
// Interceptor dapat digunakan untuk melakukan tugas tugas sepertu MENAMBAHKAN HEADER,MENANGANI KESALAHAN SECARA GLOBAL,MENGUBAH DATA PERMINTAAN/RESPONS

//Axios menyediakan dua jenis interceptor:
//1. INTERCEPTOR PERMINTAAN (request interceptor)
//    - Request interceptor akan dijalanlan sebelum permintaan dikirim KE SERVER
//    - berguna untuk menambahkan HEADER yg diperlukan,menambahkan TOKEN OTENTIKASI,menangani KESALAHAN secara global sebelum permintaan dikirm
//    - Dapat memodifikasi konfigurasi permintaan sebelum permintaan dikirim dengan mengembalikan konfigurasi yang diperbarui atau menolak permintaan dengan mengembalikan PROMISE REHECTED (promise yang ditolak)

// 2. RESPONSE INTERCEPTOR
//  Response interceptor akan dijalankan setelah menerima response dari server
// Berguna untuk menengani masalah secara global,memodifikasi DATA RESPONSE,MENGEKSTRAK (Mengeluarkan) informasi yg diperlukan dari response
//  Dapat MEMODIFIKASI RESPONSE sebelum dikembalikan dari promise dengan menegembalikan response yg diperbaharui atau menolak response dengan MENGEMBALIKAN PROMISE REJECTED(promise yang di tolak)

// membuat instance axios dengan nama instance
const instance = axios.create({
  method: "get",
  baseURL: "https://jsonplaceholder.typicode.com/users/1/albums",
});

// melakukan request interceptor
instance.interceptors.request.use(
  // pada PARAMETER PERTAMA INI,fungsi callback ini akan dijalankan sebelum permintaan dikirim ke server
  //didalamnya menambahkan headers: Accept dengan nilai "application/json" ke properti common
  // TUJUANNYA adalah untuk menambahkan header'Accept'secara otomatis setiap permintaan yg dibuat instance
  (request) => {
    if (!request.headers) {
      request.headers = {};
    }

    // ada beberapa endpoint yang tidak perlu menuliskan headers,seperti contoh kasus dibawah ini
    // request.headers.common["Accept"] = "application/json";
    console.log("request sent");
    return request;
  },
  // pada PARAMETER KEDUA INI
  // Akan dijalankan jika permintaan diatas terjadi kesalahan dengan mengembalikan PROMISE REJECTED
  (error) => {
    return Promise.reject(error);
  }
);

// Melakukan response interceptor
instance.interceptors.response.use(
  (response) => {
    // fugsi CALLBACK PERTAMA akan dijalankan setelah menerima response dari server
    // disini sebagai contoh hanya menampilkan ke console
    console.log("interceptor response dijalankan");
    return response;
  },
  // fungsi CALLBACK KEDUA,akan dijalankan jika status response = 404 (NOt Found)
  // jika tidak ada response 404 response akan dikembalikan ke promise rejected
  // TUJUANNYA adalah untuk melakukan tindakan khusus tergantung pada response yang diterima server ,misalnya menangani kesalahan atau melakaukan tindakan berdasarkan status response
  (error) => {
    if (error.response.status === 404) {
      console.log("NOT FOUND");
    }
    return Promise.reject(error);
  }
);

const Interceptors = () => {
  const [dataUser, setDataUser] = useState([]);
  // PEMANGGILAN API DARI INSTANCE YANG SUDAH DIKONFIGURASI DENGAN respons dan request INTERCEPTOR
  const fetchData = async () => {
    try {
      const response = await instance();
      console.log("response", response);
      setDataUser(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h2 className="text-center">5. interceptors</h2>
      <ul style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {dataUser.map((item, index) => {
          return <li key={index}>{item.title}</li>;
        })}
      </ul>
    </>
  );
};
export default Interceptors;
