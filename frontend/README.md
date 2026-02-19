**_Fase Analisis_**

**_*1. Use Case Diagram*_**

```mermaid
flowchart LR
%% Aktor
User([Pengguna Terdaftar])
Guest([Pengunjung])
Admin([Administrator])

    %% Use Cases
    UC1(Mencari Buku)
    UC2(Melihat Detail Buku)
    UC3(Register & Login)
    UC4(Menulis Ulasan & Rating)
    UC5(Kelola Data Buku & Moderasi)

    %% Relasi
    Guest --> UC1
    Guest --> UC2
    Guest --> UC3

    User --> UC1
    User --> UC2
    User --> UC4

    Admin --> UC5
```

**_*2. Activity Diagram*_**

```mermaid
stateDiagram-v2
[*] --> BukaHalamanDetail
BukaHalamanDetail --> CekStatusLogin

    state CekStatusLogin {
        direction LR
        Validasi: Apakah punya sesi aktif?
    }

    CekStatusLogin --> HalamanLogin : Belum Login
    HalamanLogin --> BukaHalamanDetail : Login Sukses

    CekStatusLogin --> FormUlasan : Sudah Login
    FormUlasan --> InputRatingDanTeks
    InputRatingDanTeks --> KlikSimpan
    KlikSimpan --> SimpanKeDatabase
    SimpanKeDatabase --> RefreshDaftarUlasan
    RefreshDaftarUlasan --> [*]
```

**_Fase Desain_**

**_*1 Class Diagram*_**

```mermaid
classDiagram
class User {
+int id
+String username
+String email
-String password
+register()
+login()
+writeReview()
}

    class Book {
        +String openlibrary_key
        +String title
        +String author
        +fetchCover()
        +getDetails()
    }

    class Review {
        +int id
        +int rating
        +String content
        +Date created_at
        +saveReview()
        +deleteReview()
    }

    User "1" -- "*" Review : writes
    Book "1" -- "*" Review : has
```

**_*2 Sequence Diagram (Skenario: Fetch Detail Buku)*_**

```mermaid
sequenceDiagram
actor Pengguna
participant VueComponent as Frontend (Vue)
participant APIService as Service (Axios)
participant OpenLibrary as API (OpenLibrary)

    Pengguna->>VueComponent: Klik kartu buku
    VueComponent->>APIService: Panggil getBookDetails(id)
    APIService->>OpenLibrary: HTTP GET /works/{id}.json

    alt Sukses
        OpenLibrary-->>APIService: Return JSON Data Buku
        APIService-->>VueComponent: Kirim data format object
        VueComponent-->>Pengguna: Render antarmuka halaman detail
    else Gagal/Error
        OpenLibrary-->>APIService: Return Error 404
        APIService-->>VueComponent: Kirim pesan error
        VueComponent-->>Pengguna: Tampilkan "Buku tidak ditemukan"
    end
```

**_*3 ERD *_**

```mermaid
erDiagram
    USERS ||--o{ REVIEWS : writes
    USERS ||--o{ READING_LISTS : has
    BOOKS ||--o{ REVIEWS : receives
    BOOKS ||--o{ READING_LISTS : contained_in

    USERS {
        int id PK
        string username
        string email
        string password_hash
        string role
        timestamp created_at
    }

    BOOKS {
        int id PK
        string openlibrary_key UK "ID dari OpenLibrary"
        string title
        string author
        text description
        string cover_url
        timestamp created_at
    }

    REVIEWS {
        int id PK
        int user_id FK
        int book_id FK
        int rating "Skala 1-5"
        text content
        timestamp created_at
    }

    READING_LISTS {
        int id PK
        int user_id FK
        int book_id FK
        enum status "want_to_read, reading, finished"
    }
```
