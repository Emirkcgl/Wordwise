# Proje Bağlamı

## Amaç

`WorldWise`, gezilen şehirleri harita üzerinde takip etmek için geliştirilmiş bir React + Vite uygulamasıdır.
Mevcut proje şu parçaları bir araya getirir:

- herkese açık pazarlama sayfaları
- `/app` altında uygulama alanı
- `json-server` ile çalışan mock backend
- `leaflet` / `react-leaflet` ile harita gösterimi

Bu dosyanın amacı, bir AI ajanın değişiklik yapmadan önce mevcut kod tabanını hızlıca anlayabilmesidir.

## Üst Seviye Klasörler

### `public/`

- Vite tarafından doğrudan sunulan statik/public asset'leri içerir.
- Mevcut içerik şu an minimal:
  - `vite.svg`
  - `index.css`
- Önemli not: uygulamanın asıl global stylesheet dosyası `public/index.css` değil, `src/index.css` dosyasıdır.
- Kullanıcı açıkça istemedikçe `public/index.css` dosyasını eski/ikincil dosya gibi düşün.

### `data/`

- Lokal geliştirme için mock backend verisini içerir.
- `cities.json`, `json-server` tarafından kullanılır.
- `package.json` içindeki mevcut server komutu:

```bash
npm run server
```

- Bu komut `data/cities.json` verisini `9000` portunda sunar.
- Ana koleksiyon:
  - `cities`
- Her şehir kaydı şu yapıya sahiptir:

```json
{
  "cityName": "Lisbon",
  "country": "Portugal",
  "emoji": "🇵🇹",
  "date": "2027-10-31T15:59:59.138Z",
  "notes": "My favorite city so far!",
  "position": {
    "lat": 38.727881642324164,
    "lng": -9.140900099907554
  },
  "id": 73930385
}
```

### `src/`

- Uygulamanın ana kaynak kodunu içerir.
- Temel alanlar:
  - `pages/`: route seviyesindeki sayfa bileşenleri
  - `components/`: tekrar kullanılabilir UI ve uygulama bileşenleri
  - `contexts/`: paylaşılan state ve veri çekme mantığı
  - `index.css`: global stiller ve tema değişkenleri

## Uygulama Başlangıcı

### `src/main.jsx`

- Uygulamanın giriş noktasıdır.
- `<App />` bileşenini mount eder.
- `src/index.css` dosyasını import eder.

### `src/App.jsx`

- Ana router tanımı burada bulunur.
- Uygulamayı `CitiesProvider` ile sarar.
- `BrowserRouter`, `Routes` ve nested route yapısını kullanır.

Mevcut route yapısı:

- `/` -> `Homepage`
- `/pricing` -> `Pricing`
- `/product` -> `Product`
- `/login` -> `Login`
- `/app` -> `AppLayout`
- `*` -> `PageNotFound`

`/app` altındaki nested route'lar:

- `/app` -> `/app/cities` sayfasına yönlendirir
- `/app/cities` -> `CityList`
- `/app/countries` -> `CountryList`
- `/app/cities/:id` -> `City`
- `/app/form` -> `Form`

## Layout Yapısı

### Public sayfalar

`src/pages/` içindeki şu dosyalar:

- `Homepage.jsx`
- `Pricing.jsx`
- `Product.jsx`
- `Login.jsx`

Bu dosyalar pazarlama/public yüzünü oluşturan sayfalardır.

### Uygulama kabuğu

`src/pages/AppLayout.jsx`, `/app` bölümü için ana kabuktur.

Mevcut yapı:

- sol taraf: `Sidebar`
- sağ taraf: `Map`

### Sidebar içindeki outlet davranışı

`src/components/Sidebar.jsx` içinde `<Outlet />` bulunur.

Bu şu anlama gelir: `/app` alt route içerikleri doğrudan `AppLayout` içine değil, sidebar alanının içine render edilir.
Bu mevcut tasarım açısından bilinçli bir tercihtir:

- `Map` sağ tarafta sürekli görünür
- nested route içerikleri (`CityList`, `CountryList`, `City`, `Form`) sidebar panelinde gösterilir

## State ve Veri Akışı

### `src/contexts/CitiesContext.jsx`

Şehir verisi için ana paylaşılan state kaynağıdır.

Dışarı açtıkları:

- `cities`
- `isLoading`
- `currentCity`
- `getCity(id)`

Davranış:

- İlk mount sırasında `http://localhost:9000/cities` adresinden tüm şehirleri çeker
- `getCity(id)`, tek bir şehir kaydını id ile çeker ve `currentCity` içine koyar

Mevcut sınırlamalar / notlar:

- Context içinde şu anda sadece okuma/fetch davranışı vardır
- Hata yönetimi minimal düzeydedir
- `BASE_URL` sabit/hardcoded durumda

## Ana Bileşenler

### `src/components/Map.jsx`

- `react-leaflet` kullanır
- `MapContainer`, `TileLayer`, `Marker` ve `Popup` render eder
- `useCities()` ile şehirleri okur
- Her şehir için `city.position.lat` ve `city.position.lng` değerlerine göre marker basar
- Harita container'ına tıklayınca şu an `form` sayfasına gider
- Leaflet marker ikonu, Vite içinde asset path sorunu yaşamaması için `Map.jsx` içinde açıkça import edilip `icon` prop'u ile verilir

Önemli not:

- `Map.jsx` içinde `useSearchParams` import ediliyor ve uygulama muhtemelen lat/lng tabanlı URL state yapısına doğru ilerliyor
- Harita davranışını değiştirirken query string varsayımlarını kontrol et

### `src/components/CityList.jsx`

- Yüklenme durumunda `Spinner` gösterir
- Hiç şehir yoksa `Message` fallback'i gösterir
- Aksi durumda context'ten gelen tüm şehirleri `CityItem` olarak listeler

### `src/components/CountryList.jsx`

- `cities` dizisinden benzersiz ülke listesini türetir
- `CountryItem` kartlarını render eder
- React key olarak ülke adını kullanır

### `src/components/City.jsx`

- Route paramlarından `id` okur
- Mount olduğunda veya `id` değiştiğinde `getCity(id)` çağırır
- Seçilen şehrin detaylarını gösterir

### `src/components/Form.jsx`

- Şu alanlar için lokal form state'i tutar:
  - `cityName`
  - `country`
  - `date`
  - `notes`
- `Button` ve `BackButton` içerir
- Form submit/persist davranışı şu an tam tamamlanmış değildir

## Stil Kuralları

### Global stiller

`src/index.css` şu görevleri üstlenir:

- CSS reset
- tema değişkenleri
- temel tipografi
- input stilleri
- global `.cta` utility class'ı
- Leaflet CSS import'u

### Bileşen stilleri

- UI'nin büyük kısmı CSS Modules (`*.module.css`) kullanır
- Bileşenler tipik olarak stilleri `styles` ismiyle import eder

## Önemli Çalışma Varsayımları

Kullanıcı aksi bir şey istemediği sürece bu projede şu varsayımlarla ilerle:

1. Ana global stylesheet `src/index.css` dosyasıdır.
2. Şehir verisi için source of truth `CitiesContext` dosyasıdır.
3. `/app`, uygulamanın ana etkileşim alanıdır.
4. Nested route içerikleri `Sidebar` içinde görünmesi beklenir; çünkü `<Outlet />` burada yer alır.
5. `data/cities.json`, lokal mock backend verisidir ve `json-server` ile uyumlu kalmalıdır.

## Mevcut Boşluklar / Olası Sonraki Adımlar

Bunlar doğrudan bug olmak zorunda değildir; ancak ilgili değişikliklerden önce AI ajan tarafından kontrol edilmelidir:

- `Map.jsx`, URL tabanlı lat/lng state yapısına geçiş halinde görünüyor
- `Form.jsx` hâlâ kısmi/yarım bir implementasyon
- `CitiesContext.jsx` şu an fetch yapıyor ama tam create/update/delete akışlarını desteklemiyor
- Leaflet CSS sürüm referansları, kurulu `leaflet` paketiyle uyumlu kalmalı
- Bazı dosyalar hâlâ eğitim/tutorial aşamasındaki kademeli refactor izleri taşıyor olabilir

## AI Ajanlar İçin Güvenli Düzenleme Stratejisi

Davranış değişikliği yapmadan önce:

1. Route yerleşimini doğrulamak için `src/App.jsx` dosyasını kontrol et.
2. Nested UI'nın gerçekte nerede render edildiğini görmek için `src/pages/AppLayout.jsx` ve `src/components/Sidebar.jsx` dosyalarını kontrol et.
3. Şehirle ilgili bileşenlere dokunmadan önce `src/contexts/CitiesContext.jsx` dosyasını kontrol et.
4. Görev şehir veri yapısını veya mock API davranışını etkiliyorsa `data/cities.json` dosyasını kontrol et.
5. Kullanıcı açıkça istemedikçe yeni bir mimari kurmak yerine mevcut component/module desenlerini takip et.
