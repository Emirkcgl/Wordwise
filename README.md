# WorldWise

Vite + React ile geliştirilen, gezilen şehir ve ülkeleri harita üzerinde takip etmeye yarayan uygulama.

## Teknolojiler

- **React 18** + **Vite**
- **React Router** (nested routes, dynamic `:id`, index route)
- **Leaflet** + **react-leaflet** — harita
- **Context API** (`CitiesContext`) — şehir verisi ve state
- **json-server** — mock API (`data/cities.json`)
- **CSS Modules** — bileşen stilleri

## Proje yapısı

- **Rotalar:** `/` (Homepage), `/pricing`, `/product`, `/login`, `/app` (Sidebar + Map)
- **App alt rotaları:** `/app/cities`, `/app/countries`, `/app/cities/:id`, `/app/form`
- **Bileşenler:** Map (Leaflet), Sidebar, CityList, CountryList, City (detay), Form, PageNav, Logo, vb.
- **Veri:** Şehirler `CitiesContext` üzerinden; API için `json-server` ile `data/cities.json` kullanılır.

## Bu projede pekiştirilen konular

- **Vite ile ilk uygulama** — WorldWise kurulumu
- **Routing ve SPA** — React Router ile tek sayfa uygulaması
- **Sayfalar ve rotalar** — Ana sayfalar, nested routes
- **`<Link />` ve `<NavLink />`** — Rotalar arası geçiş
- **React’ta stil seçenekleri** — CSS Modules
- **Sayfaların inşası** — Homepage, Pricing, Product, Login
- **App layout** — Sidebar + Map, `Outlet`
- **Nested routes ve index route** — `/app` alt yapısı
- **Cities / Countries list** — Liste bileşenleri
- **State’i URL’de tutma** — Dynamic routes (`cities/:id`), query string
- **Harita** — Leaflet entegrasyonu
- **Context** — Global şehir state’i

*İleride ek konular veya özellikler bu bölüme eklenebilir.*

## Çalıştırma

```bash
npm install
npm run dev
```

Mock API (ayrı terminalde, `data/cities.json` kullanır):

```bash
npm run server
```

Build:

```bash
npm run build
npm run preview
```
