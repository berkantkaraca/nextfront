import Image from 'next/image'

async function getWeatherData() {
  try {
    const res = await fetch('http://51.20.77.242:5000/WeatherForecast', { 
      cache: 'no-store',
      next: { revalidate: 0 },
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
}

export default async function Home() {
  const weatherData = await getWeatherData();
  console.log(weatherData);


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Hoş Geldiniz!
        </p>
      </div>

      <div className="relative flex place-items-center my-16">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-8 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-4">Hava Durumu Verileri</h2>
        {weatherData === null ? (
          <div className="p-4 border rounded-lg shadow-sm bg-white">
            <p className="text-red-500">Hava durumu verileri şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyiniz.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weatherData.map((weather: any, index: number) => (
              <div key={index} className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow">
                <p className="font-semibold text-lg mb-2">Tarih: {new Date(weather.date).toLocaleDateString('tr-TR')}</p>
                <div className="space-y-1">
                  <p className="text-blue-600">Sıcaklık (C): {weather.temperatureC}°C</p>
                  <p className="text-red-600">Sıcaklık (F): {weather.temperatureF}°F</p>
                  <p className="text-gray-600">Durum: {weather.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Özellik 1{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            İlk özelliğimizin açıklaması burada yer alacak.
          </p>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Özellik 2{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            İkinci özelliğimizin açıklaması burada yer alacak.
          </p>
        </a>

        <a
          href="#"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Özellik 3{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Üçüncü özelliğimizin açıklaması burada yer alacak.
          </p>
        </a>
      </div>
    </main>
  )
} 