"use server";

export async function getUserLocation() {
  try {
    const response = await fetch("http://ip-api.com/json/");
    const data = await response.json();
    return { data };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getCountries() {
  try {
    const result = await fetch("https://restcountries.com/v3.1/all");
    const json = await result.json();
    return { json };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

interface GetJobsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  userLocation?: string;
}

export async function getJobs(params: GetJobsParams) {
  const { searchQuery, filter, page = 1, pageSize = 10 } = params;
  const skipAmount = (page - 1) * pageSize;
  const url = `https://jsearch.p.rapidapi.com/search?query=${searchQuery}%20in%2${filter}&page=${page}&per_page=${pageSize}&date_posted=all`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "1f20b0a704mshd86df0cbf29126bp1db1a7jsn007f2a49a60b",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const totalJobs = result.data.length;
    const isNext = totalJobs > skipAmount + pageSize;
    return { result, isNext };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
