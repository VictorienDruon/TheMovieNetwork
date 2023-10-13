import { TimeWindow, TrendingMediaType } from "tmdb-ts";
import Poster from "@/features/poster-card/types/Poster";
import Person from "@/features/person-card/types/Person";
import { getTmdbClient } from "..";
import { getNextCursor } from "../utils/pagination";
import { isValidPerson, isValidPoster } from "../utils/filter";
import { formatPerson, formatPoster } from "../utils/map";

type Results<T extends TrendingMediaType> = T extends "person"
	? Person[]
	: Poster[];

export type TrendingPage<T extends TrendingMediaType> = {
	results: Results<T>;
	nextCursor: number;
};

export async function trending<T extends TrendingMediaType>(
	mediaType: TrendingMediaType,
	timeWindow: TimeWindow
): Promise<TrendingPage<T>> {
	try {
		const tmdb = await getTmdbClient();

		const { results, page, total_pages } = await tmdb.trending.trending(
			mediaType,
			timeWindow
		);

		const formattedResults = (
			mediaType === "person"
				? results.filter(isValidPerson).map(formatPerson)
				: results.filter(isValidPoster).map(formatPoster)
		) as Results<T>;

		const nextCursor = getNextCursor(page, total_pages);

		return { results: formattedResults, nextCursor };
	} catch (error) {
		throw error;
	}
}
