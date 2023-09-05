import { Collection } from "./Collection";
import { Cast, Crew } from "./Credits";
import { Genre } from "./Genre";
import { Language } from "./Language";
import { Company, Country } from "./Production";
import { Video } from "./Video";
import { Provider } from "./Provider";

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export interface MovieDetails extends Movie {
	belongs_to_collection: Collection[];
	budget: number;
	genres: Genre[];
	homepage: string;
	imdb_id: string;
	production_companies: Company[];
	production_countries: Country[];
	revenue: number;
	runtime: number;
	spoken_languages: Language[];
	status: string;
	tagline: string;
	providers: Provider[];
	cast: Cast[];
	crew: Crew[];
	videos: Video[];
}
