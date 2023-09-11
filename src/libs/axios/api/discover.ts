import { api } from "..";
import { Pagination } from "../types/Pagination";
import { Poster } from "@/features/poster";

export async function discoverMovies() {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
	});

	try {
		const { data } = await api.get<Pagination>("/discover/movie", {
			params,
		});

		const movies: Poster[] = data.results
			.filter((movie) => movie.poster_path !== null)
			.map((movie) => ({
				tmdb_id: movie.id,
				title: movie.title,
				poster_path: movie.poster_path,
				type: "movie",
			}));

		return movies;
	} catch (error) {
		throw error;
	}
}

export async function discoverShows() {
	const params = new URLSearchParams({
		include_adult: "false",
		language: "en-US",
	});

	try {
		const { data } = await api.get<Pagination>("/discover/tv", {
			params,
		});

		const shows: Poster[] = data.results
			.filter((show) => show.poster_path !== null)
			.map((show) => ({
				tmdb_id: show.id,
				title: show.name,
				poster_path: show.poster_path,
				type: "show",
			}));

		return shows;
	} catch (error) {
		throw error;
	}
}
