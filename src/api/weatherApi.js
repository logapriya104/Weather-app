export const fetchWeather = async (city, apiKey) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(url);
    let data;
  try {
    data = await response.json();
  } catch {
    throw new Error("Failed to read server response");
  }

  if (!response.ok) {
    console.log("API ERROR:", data);

    
    if (data && data.message) {
      throw new Error(data.message);
    } else {
      throw new Error("Something went wrong");
    }
  }

  return data;
};