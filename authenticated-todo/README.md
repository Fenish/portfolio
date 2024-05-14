# Authenticated To-Do

### Kullanılan Teknolojiler

-   NestJS
-   NestJS Cache Manager
-   Swagger
-   Redis
-   Express Sessions
-   TypeORM
-   PostgreSQL

</br>
<hr>

### Gereksinimler

<hr>

-   Redis Database
-   PostgreSQL Database

Veritabanı bilgilerinizi `.env` dosyasına kaydedin.

<hr>

### 🚧 Projeyi build etmek için

<details>
  <summary>
    <b>Npm</b>
  </summary>

```sh
  npm run build
```

</details>

<details>
  <summary>
    <b>Yarn</b>
  </summary>

```sh
  yarn run build
```

</details>

<details>
  <summary>
    <b>Pnpm</b>
  </summary>

```sh
  pnpm run build
```

</details>

</br>
<hr>

### ⚡ Projeyi çalıştırmak için

<details>
  <summary>
    <b>Npm</b>
  </summary>

```sh
  npm start:prod
```

</details>

<details>
  <summary>
    <b>Yarn</b>
  </summary>

```sh
  yarn start:prod
```

</details>

<details>
  <summary>
    <b>Pnpm</b>
  </summary>

```sh
  pnpm start:prod
```

</details>

## 🌲 Dosya Ağacı

```log
├── main.ts
├── app.module.ts
├── /api
│   └── /user
│       ├── /dto
├── /configs
├── /database
│   ├── database.module.ts
│   └── /entities
├── /decorators
│   ├── /auth
│   └── /validators
├── /errors
└── /utils

```

| Dosya/Dizin                      | Açıklama                                              |
| -------------------------------- | ----------------------------------------------------- |
| `app.module.ts`                  | Tüm modüllerin bir araya toplanmasını sağlayan modül  |
| `/Api`                           | Tüm endpointlerin oluşturulacağı ana klasör           |
| - `/api/user`                    | Örnek oluşturulmuş endpoint klasörü                   |
| - `/api/user/dto`                | User modülündeki DTO klasörü                          |
| `/Configs`                       | Config dosyalarının bulunduğu klasör                  |
| `/Database`                      | Database modülünün bulunduğu klasör                   |
| - `/database/entities`           | Database tablolarının bulunduğu klasör                |
| - `/database/database.module.ts` | Database tablolarının kaydedildiği TypeScript dosyası |
| `/Decorators`                    | Decorator dosyalarının bulunduğu klasör               |
| - `/decorators/validators`       | Validation decoratorlerinin bulunduğu klasör          |
| `/Errors`                        | Error dosyalarının bulunduğu klasör                   |
| `/Utils`                         | Utils dosyalarının bulunduğu klasör                   |

## Notlar

-   Express-session kullanılmış olup redis veritabanında saklanmaktadır.

-   Swagger modülü development modunda iken aktiftir ve url si `/api` dir

-   Veritabanında user ile profile tablosunu neden ayırdın diye sorabilirsiniz. Bunun sebebi bu basit bir proje olduğu için ve profil kısmına sürekli yeni özellikler eklenebileceği için hassas bilgiler ile bir tutmak istemedim.
